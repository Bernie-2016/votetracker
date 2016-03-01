import React, { Component } from 'react';
import { findState } from '../../data/states';

export default class ReportLayout extends Component {
  getChildContext() {
    return { state: findState(this.props.params.state) };
  }

  render() {
    const params = this.props.params;
    const children = this.props.children;
    const state = findState(params.state);
    return (
      <div className="report">
        <h2>{ state.name } { state.type }</h2>
        { children }
      </div>
    );
  }
}

ReportLayout.propTypes = {
  params: React.PropTypes.object,
  children: React.PropTypes.element,
};

ReportLayout.childContextTypes = {
  state: React.PropTypes.object,
};
