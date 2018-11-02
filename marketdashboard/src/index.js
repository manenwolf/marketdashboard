/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import {loadMunten} from './actions/muntActions';
import {loadUsers, loginUser} from './actions/userActions';
import {loadAandelen} from './actions/aandeelActions';
import toastr from 'toastr';
import cookie from 'react-cookies';

import './styles/styles.css'; //Webpack can import CSS files too!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';

toastr.options.positionClass = "toast-bottom-right";

const store = configureStore();
setInterval(function(){

  console.log("loading in data");
  store.dispatch(loadMunten());
  store.dispatch(loadAandelen());
  store.dispatch(loadUsers());

},10000);

store.dispatch(loadMunten());

store.dispatch(loadAandelen());
store.dispatch(loadUsers());
store.dispatch(loginUser({username: cookie.load('username'), password: cookie.load('password')}));

render(
  <Provider store = {store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
