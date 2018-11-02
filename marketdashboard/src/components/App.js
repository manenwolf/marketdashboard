// This component handles the App template used on every page.
import React from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';
import cookie from 'react-cookies'


class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header 
        user = {this.props.user}
        />
        <div>
        {this.props.children}
        </div>
        
      </div>
      
    );
  }
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



export default connect(mapStateToProps)(App);