import React from 'react';

import CaucusForm from './caucus';
import PrimaryForm from './primary';

export default class FormSelector extends React.Component {
  render() {
    const state = this.context.state;
    const params = this.props.params;
    return (
      state.type === 'Primary' ? <PrimaryForm params={params} /> : <CaucusForm params={params} />
    );
  }
}

FormSelector.propTypes = {
  params: React.PropTypes.object,
};

FormSelector.contextTypes = {
  state: React.PropTypes.object,
};

export default FormSelector;
