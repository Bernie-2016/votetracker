import React, { Component } from 'react';
import Menu from '../simple-menu';
import { helpEmail } from '../../data/contact';

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

    const renderItem = location => {
      const { pollinglocation, pollingaddress, pollingcity, pollingzip } = location;
      const state = this.props.params.state;
      const firstPart = `${pollinglocation} — ${pollingaddress}, ${pollingcity}`
        .replace(/\b([a-zA-Z])(\w*)/g, (_, $1, $2) => $1.toUpperCase() + $2.toLowerCase());

      return `${firstPart}, ${state} ${pollingzip}`;
    };

    return (
      <div className="location-form">
        <h3>Select your Polling Location</h3>
        <h5>If you don't see your location, email { helpEmail }.</h5>
        <h5>Please include your county, precinct, and polling location, along with your report
        of the total ballots cast.</h5>
        <Menu filter={locations.length > 10}
          items={locations}
          makeLink={makeLink}
          renderItem={renderItem}
        />
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
