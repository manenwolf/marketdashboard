import React from 'react';
import {connect} from 'react-redux';
import { instanceOf } from 'prop-types';
import {Router, browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import LoginForm from './LoginForm';
import toastr from 'toastr';
import cookie from 'react-cookies';
import * as loginActions from '../../actions/userActions';
import {createSalt, hashPwd} from '../../api/encryption'
import configureStore from '../../store/configureStore';
import {loadMunten} from '../../actions/muntActions';
import {loadAandelen} from '../../actions/aandeelActions';
import {loadUsers, loginUser} from '../../actions/userActions';

class ManageLoginPage extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        user: Object.assign({}, props.user),
        errors: {}
      };
      this.updateSate = this.updateSate.bind(this);
      this.loginUser = this.loginUser.bind(this);
    }

    loginUser(event){
      
      
      event.preventDefault();

          let logginuser = {
            username:this.state.user.username,
            password:  hashPwd(null,this.state.user.password)
          }
          this.props.actions.loginUser(logginuser)
          
        .then(user =>{ 
          
            toastr.success('logged in');
            cookie.save("username", this.state.user.username);
            cookie.save("password", hashPwd(null,this.state.user.password));
          //  this.props.actions.loadUsers();
            



            const store = configureStore();
            
            
            store.dispatch(loadMunten());
            
            store.dispatch(loadAandelen());
            store.dispatch(loadUsers());
            store.dispatch(loginUser({username: cookie.load('username'), password: cookie.load('password')}));




            this.redirect();
          

          

        })
        .catch(error =>{
          toastr.error(error);
        })
        
    }

  updateSate(event){

   const field = event.target.name;
   let user = Object.assign({}, this.state.user);
   user[field] = event.target.value;
   return this.setState({user: user});
  }

    redirect(){
      browserHistory.push('/');
    }
  render() {
    return (
      <div>
        <h1>enter logins</h1>
        <LoginForm 
          onChange={this.updateSate}
          onSave={this.loginUser}
          errors={this.errors}
          errors={this.state.errors}
          buttonname='login'
          user={this.state.user}

        />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
      let user = {username: "", password: ""};

  return{
    user: user
    
  };

}


function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps) (ManageLoginPage);