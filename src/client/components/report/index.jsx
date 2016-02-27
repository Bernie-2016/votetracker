import React from 'react';
import { findState } from '../../data/states';

import Primary from './primary';
import Caucus from './caucus';

const Report = ({ params }) => {
  const state = findState(params.state);

  return (
    <div>
      <h1>Report for { state.name } { state.type }</h1>
      { state.type === 'Primary' ?
        <Primary { ...state } />
        :
        <Caucus { ...state } />
      }
    </div>
  );
};

Report.propTypes = {
  params: React.PropTypes.object,
};

export default Report;
