import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Layout from './components/layout';
import Home from './components/home';
import Report from './components/report';
import PageNotFound from './components/page-not-found';

const routes = (
  <Router history={ browserHistory }>
    <Route path="/" component={ Layout }>
      <IndexRoute component={ Home } />
      <Route path="/report/:state" component={ Report } />
      <Route path="*" component={ PageNotFound } />
    </Route>
  </Router>
);

ReactDOM.render(routes, document.querySelector('#main'));
