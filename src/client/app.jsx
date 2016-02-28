import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Layout from './components/layout';
import Home from './components/home';
import County from './components/county';
import PageNotFound from './components/page-not-found';

import ReportRoute from './components/report/route';

const routes = (
  <Router history={ browserHistory }>
    <Route path="/" component={ Layout }>
      <IndexRoute component={ Home } />
      <Route { ...ReportRoute } >
        <Route path=":county" component={ County } >
          <Route path=":location" component={ Location } />
        </Route>
      </Route>
      <Route path="*" component={ PageNotFound } />
    </Route>
  </Router>
);

ReactDOM.render(routes, document.querySelector('#main'));
