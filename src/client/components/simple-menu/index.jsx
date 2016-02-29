import React, { Component } from 'react';
import { Link } from 'react-router';
import './styles.styl';
import fuzzy from 'fuzzy';
import debounce from 'lodash.debounce';

export default class SimpleMenu extends Component {
  constructor() {
    super();
    this.state = {
      q: '',
    };

    this.changeFilter = this.changeFilter.bind(this);
    this.updateFilter = debounce(this.updateFilter.bind(this), 250);
  }

  changeFilter(event) {
    this.filterInput = event.target;
    this.updateFilter();
  }

  updateFilter() {
    this.setState({ q: this.filterInput.value });
  }

  render() {
    if (!this.props) { return <span></span>; }
    const filter = this.props.filter;

    let { items, makeLink, renderItem } = this.props;

    if (filter) {
      items = fuzzy.filter(this.state.q, items, {
        extract: renderItem,
        pre: '§',
        post: '§',
      }).sort((a, b) => b.score - a.score || a.string.localeCompare(b.string));
      const oMakeLink = makeLink;
      makeLink = match => oMakeLink(match.original);
      renderItem = match => {
        const parts = match.string.replace('§§', '').split('§');
        const html = (<span>{parts.map((part, index) => (
          index % 2 ? <span className="search-match" key={index}>{part}</span> :
            <span key={index}>{part}</span>)
        )}</span>);
        return html;
      };
    }

    return (
      <ul className="menu">
      {filter ? (
        <label>You can enter part of the location name to filter results.
          <li className="filter">
            <input onChange={this.changeFilter}
              onKeyUp={this.changeFilter}
              onInput={this.changeFilter}
              placeholder="Search" type="search"
            />
          </li>
          </label>
      ) : ''}
      {items.map((item, index) => (
        <li className="menu-item" key={index}>
          <Link className="menu-link" to={makeLink(item)}>
            {renderItem(item)}
          </Link>
        </li>
      ))}
      </ul>
    );
  }
}

SimpleMenu.propTypes = {
  items: React.PropTypes.array.isRequired,
  makeLink: React.PropTypes.func.isRequired,
  renderItem: React.PropTypes.func.isRequired,
  filter: React.PropTypes.bool,
};

export default SimpleMenu;
