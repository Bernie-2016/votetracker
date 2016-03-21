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
import CaucusDisabled from './components/report/caucus-disabled';

import ReportRoute from './components/report/route';

import './components/layout/images/favicon.ico';

browserHistory.listen(location => {
  if (typeof window.ga === 'function') window.ga('send', 'pageview', location.pathname);
});

const routes = (
  <ApiProvider>
    <Router history={ browserHistory }>
        <Route path="/" component={ Layout }>
          <IndexRoute component={ Home } />
          <Route path="report/ID" component={ CaucusDisabled } />
          <Route path="report/UT" component={ CaucusDisabled } />
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
