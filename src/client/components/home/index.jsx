import React from 'react';
import './styles';
import states from '../../data/states';
import moment from 'moment';
import { Link } from 'react-router';

const statesFiltered = states.filter(state => state.election_day.isSame(moment('3/1', 'M/D')));

const Home = () => (
  <div>
    <h1>Welcome home</h1>
    {statesFiltered.map(state => (
      <Link
        to={`/report/${state.state_code}`}
        key={state.state_code}
      >
        {state.state_code} - {state.election_day.fromNow()}
      </Link>
    ))}
  </div>
);

export default Home;
