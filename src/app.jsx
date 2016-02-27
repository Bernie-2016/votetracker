import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Layout from './components/layout';
import Home from './components/home';
import PageNotFound from './components/page-not-found';

/* Routes */
const routes = (
  <Router history={ browserHistory }>
    <Route path="/" component={ Layout }>
      <IndexRoute component={ Home } />
      <Route path="*" component={ PageNotFound } />
    </Route>
  </Router>
);

ReactDOM.render(routes, document.querySelector('#main'));
