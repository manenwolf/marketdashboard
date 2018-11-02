import React from 'react';
import {connect} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import * as loginActions from '../../actions/userActions'; 
import LoginForm from '../adimin/LoginForm';
import cookie from 'react-cookies';

class ManageRegisterPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            user: Object.assign({}, props.user),
            errors: {}
          };

        this.logout = this.logout.bind(this);
        this.updateSate = this.updateSate.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }
    updateUser(event){
      
        event.preventDefault();
        this.props.actions.updateUser(this.state.user)
          .then(()=>{ 
            toastr.success('acount updated');
            this.redirect()
          })
          .catch(error =>{
            toastr.error(error);
          })
      }
        logout(){
            event.preventDefault();
            cookie.remove('username');
            cookie.remove('password');
            this.props.actions.logoutUser()
              .then(()=>{
                toastr.success('logged out');

                   this.redirect()

                })
              .catch(error =>{
                toastr.error(error);
              })
        };
        redirect(){
            browserHistory.push('/');
          }
          updateSate(event){

           const field = event.target.name;
           let user = Object.assign({}, this.state.user);
           user[field] = event.target.value;
           return this.setState({user: user});
          }

        render() {
            return (
              <div>
                <h1>acount page</h1>
                <input
                    className="btn btn-danger btn-lg"
                    type="submit"
                    value = 'loggout'
                    onClick={this.logout}
                />
                        <LoginForm 
                            onChange={this.updateSate}
                            onSave={this.updateUser}
                            errors={this.errors}
                            errors={this.state.errors}
                            buttonname='update'
                            user={this.state.user}
                            username = {this.state.user.username}
                            />

                </div>
                ) };

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