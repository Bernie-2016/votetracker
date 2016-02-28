import React from 'react';
import svg from './images/billionaires.png';

const Footer = () => (
  <div className="footer-offset">
    <footer>
      <p className="address">Bernie 2016<br />PO Box 905<br />Burlington, VT 05402</p>
      <p className="site-title">Paid for by Bernie 2016</p>
      <span className="billionaires">
        <img src={ svg } width="200" height="40" alt="(not the billionaires)" />
      </span>
      <p><span className="copyright">&copy; Bernie 2016</span> | <a href="https://berniesanders.com/privacy-policy">Privacy Policy</a></p>
    </footer>
  </div>
);

export default Footer;
