import React, { Component } from 'react';
import superagent from 'superagent';

export default class LocationSelect extends Component {

  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const { state, county } = this.props.params;
    superagent.get(`/api/states/${state}/${county}/locations`)
      .set('Accept', 'application/json')
      .end((err, response) => {
        if (err || !response.ok || !response.body.length) {
          this.setState({ loading: false, error: true });
        } else {
          this.setState({
            loading: false,
            locations: response.body,
          });
        }
      });
  }

  render() {
    return (
      <div className="LocationForm">
        Dumping locations {JSON.stringify(this.state.locations)}
      </div>
    );
  }
}

LocationSelect.propTypes = {
  params: React.PropTypes.object,
};
