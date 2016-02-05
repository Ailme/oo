"use strict";

/*eslint-disable */
import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
/*eslint-enable */
import {path} from './config';
import App from '../../application';
import HomePage from "./home";
import UpdatePage from "./update";

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} title="Users"/>
      <Route path={path.create} component={UpdatePage} title="Create User"/>
      <Route path={path.update} component={UpdatePage} title="Edit User"/>
      <Route path={path.home} component={HomePage} title="User"/>
    </Route>
  </Router>
), document.getElementById('content'));
