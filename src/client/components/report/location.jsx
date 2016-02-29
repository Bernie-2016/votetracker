import React, { Component } from 'react';
import fuzzy from 'fuzzy';
import Menu from '../simple-menu';
import debounce from 'lodash.debounce';

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

    const updateFilter = debounce(() => {
      this.setState({ filter: this.filterInput.value });
    }, 250);

    const matches = fuzzy.filter(this.state.filter || '', locations, {
      extract: location => `${location.pollinglocation} ${location.pollingaddress} ` +
        `${location.pollingcity} ${this.props.params.state} ${location.pollingzip}`,
      pre: '§',
      post: '§',
    }).sort((a, b) =>
      b.score - a.score || a.original.pollinglocation.localeCompare(b.original.pollinglocation)
    );

    const markInput = element => {
      if (element) this.markInput(element);
    };

    const makeLink = match => {
      const { state, county } = this.props.params;
      return `/report/${state}/${county}/${match.original.id}/`;
    };

    const renderItem = match => {
      const parts = match.string.replace('§§', '').split('§');
      const html = (<span>{parts.map((part, index) => (
        index % 2 ? <strong key={index}>{part}</strong> : <span key={index}>{part}</span>)
      )}</span>);
      return html;
    };

    const inputEvents = {
      onKeyUp: updateFilter,
      onChange: updateFilter,
      onInput: updateFilter,
    };

    return (
      <div className="location-form">
        <h2>Select your Polling Location</h2>
        <input ref={markInput}
          {...inputEvents}
          placeholder="Filter the list"
        />
        <Menu items={matches} makeLink={makeLink} renderItem={renderItem} />
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
