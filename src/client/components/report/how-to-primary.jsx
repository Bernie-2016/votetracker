import React from 'react';
import { Link } from 'react-router';
import { helpEmail } from '../../data/contact';

const HowToPrimary = () => (
  <div className="how-to primary">
    <p>You can get turnout totals from your election official after you cast your ballot or
      even before walking in. Just ask for the total number of ballots cast in the Democratic
      primary so far.</p>
    <p>When they give you the totals, ask:</p>
    <p>Does this include early vote or absentee ballots?</p>
    <p>Does this cover multiple precincts? If so, which ones?</p>
    <p>First, you'll be asked to select your county.
      Then select your polling location, and fill out the following form.</p>
    <p>Questions? Check out our <Link to="/faq">FAQ.</Link></p>
    <h5>If you don't see your county, email { helpEmail } with the information above.</h5>
    <h5>Please include your county, precinct, and polling location
       to the best of your knowledge.</h5>
  </div>
);

export default HowToPrimary;
