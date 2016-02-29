import React from 'react';
import { Link } from 'react-router';

const Header = () => (
  <header>
    <Link className="logo sanders-logo" to="/">
      <h1 className="a11y-only">
      Bernie 2016
      </h1>
    </Link>
    <h2><Link to="/">VoteTracker</Link></h2>
  </header>
);

export default Header;
