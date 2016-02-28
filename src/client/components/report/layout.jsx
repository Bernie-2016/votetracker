import React from 'react';
import { findState } from '../../data/states';

const ReportLayout = ({ params, children }) => {
  const state = findState(params.state);
  return (
    <div className="report">
      <h1>Report for { state.name } { state.type }</h1>
      { children }
    </div>
  );
};

ReportLayout.propTypes = {
  params: React.PropTypes.object,
  children: React.PropTypes.element,
};

export default ReportLayout;
