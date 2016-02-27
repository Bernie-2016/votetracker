import React from 'react';
import './styles';
import states from '../../../../fixtures/states.csv';
const Home = () => (
  <div>
    <h1>Welcome home</h1>
    {JSON.stringify(states)}
  </div>
);

export default Home;
