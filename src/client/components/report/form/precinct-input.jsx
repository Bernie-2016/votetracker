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
          <select name="precinct_id" className={this.props.className}>
            <option value="">---Select your precinct---</option>
            {this.props.required ? null : <option value="-1" key="all">---ALL PRECINCTS---</option>}
            {precincts.map((precinct, index) => (precinct.id ?
              <option key={`opt.${index}`} value={precinct.id}>{precinct.name}</option> : null
            ))}
          </select>
          {this.props.children}
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
  children: React.PropTypes.element,
  required: React.PropTypes.bool,
  className: React.PropTypes.string,
};
