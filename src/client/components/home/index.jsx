import React from 'react';
import './styles';
import states from '../../data/states';
import moment from 'moment';

import Menu from '../simple-menu';

const statesFiltered = states.filter(state => state.election_day.isSame(moment('3/1', 'M/D')));

const Home = () => (
  <div>
    <p>Welcome to VoteTracker, the official Bernie 2016 app to track turnout on election day.
      Thank you for help. </p>
    <p>To start, select your state from the options below.</p>
    <h1>Select Your State:</h1>
    <Menu items={statesFiltered}
      makeLink={state => `/report/${state.state_code}/`} // eslint-disable-line
      renderItem={state => state.state_code} // eslint-disable-line
    />
  </div>
);

export default Home;
