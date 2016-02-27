import React from 'react';
import './styles';

const Layout = ({ children }) => (
  <div className="container">
    <h1>VoteTracker</h1>
    { children }
  </div>
);

Layout.propTypes = {
  children: React.PropTypes.node,
};

export default Layout;
