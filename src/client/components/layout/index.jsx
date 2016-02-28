import React from 'react';
import './styles';
import Footer from './footer';
import Header from './header';

const Layout = ({ children }) => (
  <div className="container">
    <Header />
    <div className="content-area">
      { children }
    </div>
    <Footer />
  </div>

);

Layout.propTypes = {
  children: React.PropTypes.node,
};

export default Layout;
