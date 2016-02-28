import React from 'react';

const CaucusReport = () => (
  // select county
  // select polling location
  <div className="CaucusReportForm">
    <form>
      <label>Phase:
        <select>
          <option>First Count</option>
          <option>Second Count</option>
          <option>Final Count</option>
        </select>
      </label>

      <label>Sanders Supporters:
        <input type="number" />
      </label>
      <label>Clinton Supporters:
        <input type="number" />
      </label>
      <label>Total Sanders Delegates:
        <input type="number" />
      </label>
      <label>Total Clinton Delegates:
        <input type="number" />
      </label>
      <label>Total Other Delegates:
        <input type="number" />
      </label>
    </form>
  </div>
);

export default CaucusReport;
