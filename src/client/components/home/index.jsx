import React from 'react';
import './styles';
import states from '../../data/states';
import moment from 'moment';
import { helpEmail } from '../../data/contact';

import Menu from '../simple-menu';

const statesFiltered = states.filter(state => state.election_day.isSame(moment('4/26', 'M/D')));

const Home = () => (
  <div>
    <h2>Welcome to VoteTracker, the official Bernie 2016 app to track turnout on election day.
      Thank you for help. </h2>
    <h4>Please use VoteTracker to report your community’s turnout at the polls today.</h4>
    <h4>If you want to find your polling location, go to <a href="https://vote.berniesanders.com/">vote.berniesanders.com.</a></h4>
    <h4>For issues at the polls, email { helpEmail } with details.</h4>
    <h2>To get started, select your state:</h2>
    <Menu items={statesFiltered}
      makeLink={state => `/report/${state.state_code}/`} // eslint-disable-line
      renderItem={state => state.state_code} // eslint-disable-line
    />
  </div>
);

export default Home;
