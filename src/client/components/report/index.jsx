import React, { Component } from 'react';

import Menu from '../simple-menu';
import { Link } from 'react-router';

import HowToPrimary from './how-to-primary';
import HowToCaucus from './how-to-caucus';

import './style';

export default class Report extends Component {

  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.context.api.getCounties(this.props.params.state)
      .then(counties => {
        this.setState({ loading: false, counties });
      }, () => {
        this.setState({ error: true, loading: false });
      });
  }

  render() {
    if (!this.props.params) {
      return <ins />;
    }
    const loading = !this.state || this.state.loading;
    const counties = this.state && this.state.counties || [];
    const error = this.state && this.state.error;
    return (
      <div>
        { this.context.state.type === 'Primary' ? <HowToPrimary /> : <HowToCaucus /> }
        <div className="loading" hidden={!loading}>
          <h2>Loading</h2>
          Loading counties
        </div>
        <div className="error" hidden={!error}>
          <h2>Error</h2>
          <p>There was an error loading the counties.</p>
          <Link to="/">Back home</Link>
        </div>
        <div className="select-county" hidden={loading || error}>
          <h3>Select your County:</h3>
          <Menu items={counties}
            filter={counties.length > 20}
            makeLink={county => `/report/${this.props.params.state}/${county}/`} // eslint-disable-line
            renderItem={county => `${county}`} // eslint-disable-line
          />
        </div>
      </div>
    );
  }
}

Report.propTypes = {
  params: React.PropTypes.object.isRequired,
};

Report.contextTypes = {
  api: React.PropTypes.object.isRequired,
  state: React.PropTypes.object.isRequired,
};

export default Report;
