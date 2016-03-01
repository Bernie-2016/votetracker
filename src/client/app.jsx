import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import ApiProvider from './components/api-provider';
import Layout from './components/layout';
import Home from './components/home';
import PageNotFound from './components/page-not-found';
import Official from './components/official';
import ThankYou from './components/thank-you';
import Faq from './components/faq';
import Texas from './components/texas';

import ReportRoute from './components/report/route';

import './components/layout/images/favicon.ico';

const routes = (
  <ApiProvider>
    <Router history={ browserHistory }>
        <Route path="/" component={ Layout }>
          <IndexRoute component={ Home } />
          <Route path="report/TX" component={ Texas } />
          <Route { ...ReportRoute } />
          <Route path="official" component={ Official } />
          <Route path="thank-you" component ={ ThankYou } />
          <Route path="faq" component={ Faq } />
          <Route path="*" component={ PageNotFound } />
        </Route>
    </Router>
  </ApiProvider>
);

ReactDOM.render(routes, document.querySelector('#main'));
