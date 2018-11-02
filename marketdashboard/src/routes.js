import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import MuntenPage from './components/munt/MuntenPage';
import LoginPage from './components/adimin/ManageLoginPage';
import registerPage from './components/adimin/ManageRegisterPage'
import userPage from './components/user/ManageUserPage';
import userListPage from './components/user/UserListPage';
import AandelenPage from './components/aandeel/AandelenPage';
export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="munten" component={MuntenPage} />
    <Route path="Login" component={LoginPage} />
    <Route path="register" component={registerPage} />
    <Route path="user" component={userPage} />
    <Route path="users" component={userListPage} />
    <Route path="aandelen" component={AandelenPage} />
  </Route>
);
