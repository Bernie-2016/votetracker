import React from 'react';
import { findState } from '../../data/states';

const Report = ({ params }) => {
  const state = findState(params.state);
  return (
    <h1>Report for { state.name } { state.type }</h1>
  );
};

Report.propTypes = {
  params: React.PropTypes.object,
};

export default Report;
