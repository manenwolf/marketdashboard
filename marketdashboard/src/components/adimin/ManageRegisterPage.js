import React from 'react';
import {connect} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import LoginForm from './LoginForm';
import toastr from 'toastr';
import cookie from 'react-cookies'
import * as loginActions from '../../actions/userActions';

class ManageRegisterPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: Object.assign({}, props.user),
      errors: {}
    };
    this.updateSate = this.updateSate.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  updateSate(event){

   const field = event.target.name;
   let user = Object.assign({}, this.state.user);
   user[field] = event.target.value;
   return this.setState({user: user});
  }

  redirect(){
    toastr.success('registered');
    browserHistory.push('/login');
  }
    registerUser(event){
      event.preventDefault();
      this.props.actions.registerUser(this.state.user)
        .then(()=>{ this.redirect()})
        .catch(error =>{
          toastr.error(error);
        })

    }

    render() {
        return (
          <div className="jumbotron">
            <h3>enter username and password to create acount</h3>
            <LoginForm 
          onChange={this.updateSate}
          onSave={this.registerUser}
          errors={this.errors}
          errors={this.state.errors}
          buttonname='register'
          user={this.state.user}

        />
            </div>
            ) }
}

function mapStateToProps(state, ownProps){
  let user;
  if(cookie.load('username')!= undefined){
   
   user = {
    username: cookie.load('username'),
    password: cookie.load('password')
  }
}else{
   user = null;
}
return{
user: user

};

}


function mapDispatchToProps(dispatch){
return {
actions: bindActionCreators(loginActions, dispatch)
};
}


export default connect(mapStateToProps, mapDispatchToProps) (ManageRegisterPage);
