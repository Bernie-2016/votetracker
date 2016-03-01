import React, { Component } from 'react';

export default class PrecinctInput extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.fetchIt();
  }

  componentWillReceiveProps(newProps) {
    this.fetchIt(newProps);
  }

  fetchIt(props = this.props) {
    let fetch;
    if (props.location) {
      fetch = this.context.api.getPrecinctsFromLocation(props.location);
    } else if (props.county && props.state) {
      fetch = this.context.api.getPrecinctsFromCounty(props);
    } else {
      this.setState({ precincts: [] });
      return;
    }
    fetch.then(precincts => {
      this.setState({ precincts });
    }, () => {
      const router = this.context.router;
      console.error('Errored looking for precincts'); // eslint-disable-line
      router.replace('/');
    });
  }

  render() {
    const { precincts } = this.state;
    if (precincts && precincts.length) {
      if (precincts.length === 1) {
        return <input type="hidden" name="precinct_id" value={precincts[0].id} />;
      }
      return (
        <label>Select Precinct
          <select name="precinct_id">
            <option value="">---ALL PRECINCTS---</option>
            {precincts.map(precinct => (
              <option key={precinct.id} value={precinct.id}>{precinct.name}</option>
            ))}
          </select>
        </label>
      );
    }
    return <span />;
  }
}

PrecinctInput.contextTypes = {
  api: React.PropTypes.object,
  router: React.PropTypes.object,
};

PrecinctInput.propTypes = {
  location: React.PropTypes.any,
  county: React.PropTypes.string,
};
