import React from 'react';
import { Link } from 'react-router';

import svg from './images/billionaires-2x.png';

const Footer = () => (
  <div className="footer-offset">
    <footer>
      <p>Questions? Check out our <Link to="/faq">FAQ.</Link></p>
      <p className="address">Bernie 2016<br />PO Box 905<br />Burlington, VT 05402</p>
      <p className="site-title">Paid for by Bernie 2016</p>
      <span className="billionaires">
        <img src={ svg } width="195" height="28" alt="(not the billionaires)" />
      </span>
      <p><span className="copyright">&copy; Bernie 2016</span> | <a href="https://berniesanders.com/privacy-policy">Privacy Policy</a></p>
    </footer>
  </div>
);

export default Footer;
