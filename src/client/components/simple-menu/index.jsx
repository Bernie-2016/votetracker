import React from 'react';
import { Link } from 'react-router';
import './styles.styl';

const SimpleMenu = ({ items, makeLink, renderItem }) => (
  <ul className="menu">
  {items.map((item, index) => (
    <li className="menu-item" key={index}>
      <Link className="menu-link" to={makeLink(item)}>
        {renderItem(item)}
      </Link>
    </li>
  ))}
  </ul>
);

SimpleMenu.propTypes = {
  items: React.PropTypes.array.isRequired,
  makeLink: React.PropTypes.func.isRequired,
  renderItem: React.PropTypes.func.isRequired,
};

export default SimpleMenu;
