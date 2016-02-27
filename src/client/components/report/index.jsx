import React from 'react';
import { findState } from '../../data/states';

import Primary from './primary';
import Caucus from './caucus';

const selectReport = state => {
  if (state.type === 'Primary') {
    return (<Primary { ...state } />);
  }
  return (<Caucus { ...state} />);
};

const Report = ({ params }) => {
  const state = findState(params.state);
  return (
    <div>
      <h1>Report for { state.name } { state.type }</h1>
      { selectReport(state) }
    </div>
  );
};

Report.propTypes = {
  params: React.PropTypes.object,
};

export default Report;
