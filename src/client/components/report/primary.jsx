import React from 'react';

var counties = ['whee', 'boom', 'yay', 'silly'];

const PrimaryReport = () => (
  // select county
  // select polling location
  // field for total Dem ballots cast
  <div className="PrimaryReportForm">
    <form>
    <label>Total Democratic Ballots Cast
      <input type="number" name="ballots-cast" />
    </label>
    </form>
  </div>
);

export default PrimaryReport;
