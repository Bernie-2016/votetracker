import React, { Component } from 'react';
import superagent from 'superagent';
import { findState } from '../../data/states';

import Menu from '../simple-menu';
import { Link } from 'react-router';

export default class Report extends Component {

  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    superagent.get(`/api/states/${this.props.params.state}/counties`)
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (err || !response.ok || !response.body.length) {
          this.setState({ loading: false, error: true });
        } else {
          this.setState({
            loading: false,
            counties: response.body,
            state: findState(this.props.params.state),
          });
        }
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
        <div className="how-to">
          Write some instructions for the state here!  We need to split this into Primary / Caucus
        </div>
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
          <h2>Please Select your County</h2>
          <Menu items={counties}
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

export default Report;
