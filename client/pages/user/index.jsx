"use strict";

/*eslint-disable */
import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
/*eslint-enable */
import Application from '../../application';
import NoMatch from "../_no-match";
import HomePage from "./home";
import UpdatePage from "./update";

render((
  <Router history={browserHistory}>
    <Route path="/" component={Application}>
      <IndexRoute component={HomePage}/>
      <Route path="/create" component={UpdatePage}/>
      <Route path="/update/:id" component={UpdatePage}/>
      <Route path="/:date" component={HomePage}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('content'));
