import React, { Component } from 'react';
import Menu from '../simple-menu';

export default class LocationSelect extends Component {

  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const { state, county } = this.props.params;
    this.context.api.getLocations({ state, county })
      .then(locations => {
        this.setState({ loading: false, locations });
      }, () => {
        this.setState({ loading: false, error: true });
      });
  }

  markInput(element) {
    this.filterInput = element;
  }

  render() {
    const locations = (this.state.locations || []);

    const makeLink = location => {
      const { state, county } = this.props.params;
      return `/report/${state}/${county}/${location.id}/`;
    };

    const renderItem = location =>
      `${location.pollinglocation} ${location.pollingaddress} ` +
        `${location.pollingcity} ${this.props.params.state} ${location.pollingzip}`;

    return (
      <div className="location-form">
        <h3>Select your Polling Location</h3>
        <Menu filter items={locations} makeLink={makeLink} renderItem={renderItem} />
      </div>
    );
  }
}

LocationSelect.contextTypes = {
  api: React.PropTypes.object,
};

LocationSelect.propTypes = {
  params: React.PropTypes.object,
};
