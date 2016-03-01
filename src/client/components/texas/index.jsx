import React from 'react';
import { email, phone } from '../../data/contact';

const TexasPage = () => (
  <div className="sorry-texas">
    <h3>Unfortunately, Texas is offline.</h3>
    <h3>To report your results for Texas turnout, please email {email} or
       you can text/call your results to {phone}.</h3>
  </div>
);

export default TexasPage;
