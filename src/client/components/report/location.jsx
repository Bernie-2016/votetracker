import React, { Component } from 'react';
import superagent from 'superagent';
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
    const locations = (this.state.locations || []);
    const updateFilter = debounce(event => {
      this.setState({ filter: document.querySelector('#location-complete').value });
    }, 250);
    const matches = fuzzy.filter(this.state.filter || '', locations, {
      extract: location => `${location.pollinglocation} ${location.pollingaddress} ${location.pollingcity} ${this.props.params.state} ${location.pollingzip}`,
      pre: '§',
      post: '§',
    }).sort((a, b) => b.score - a.score || a.original.pollinglocation.localeCompare(b.original.pollinglocation));


    const makeLink = match => `/report/${this.props.params.state}/${this.props.params.county}/${match.original.id}/`;
    const renderItem = match => {
      var parts = match.string.replace('§§', '').split('§');
      var html = (<span>{parts.map((part,index) => (
        index % 2 ? <strong key={index}>{part}</strong> : <span key={index}>{part}</span>)
      )}</span>);
      return html;
    };

    return (
      <div className="location-form">
        <h2>Select your Polling Location</h2>
        <input id="location-complete" onKeyUp={updateFilter} onChange={updateFilter} onInput={updateFilter} placeholder="Filter the list" />
        <Menu items={matches} makeLink={makeLink} renderItem={renderItem} />
      </div>
    );
  }
}

LocationSelect.propTypes = {
  params: React.PropTypes.object,
};
