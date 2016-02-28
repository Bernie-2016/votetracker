import React, { Component } from 'react';
import superagent from 'superagent';

import Menu from '../simple-menu';

export default class Report extends Component {
  componentDidMount() {
    superagent.get(`/api/states/${this.props.params.state}/counties`)
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (err || !response.ok) {
          this.setState({ loading: false, error: true });
        } else {
          this.setState({ loading: false, counties: response.body });
        }
      });
  }

  constuctor() {
    this.state = {
      loading: true,
    };
  }

  render() {
    if (!this.props.params) {
      return <ins />;
    }
    const loading = !this.state || this.state.loading;
    const counties = this.state && this.state.counties || [];
    return (
      <div>
        <div className="how-to">
          Write some instructions for a state here!
        </div>
        <div className="select-county" hidden={loading}>
          <h2>Please Select your County</h2>
          <Menu items={counties}
            makeLink={county => `${county}/`} // eslint-disable-line
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
