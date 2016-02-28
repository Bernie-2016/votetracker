import React from 'react';
import Submitable from './submitable';
import TimeSelect from './timeselect';


export default class OfficialReport extends Submitable {

  render() {
    return (
      <div className="OfficialReportForm">
        <p>Please select whether this report is for the number of ballots cast or the percent of the
         total vote. Then enter the number or percent of votes for Sanders, Clinton, or Other.
         Include the source of this information, and the time at which it was reported.</p>
        <form ref={this.trackForm}>
        <label>
          <select>Percent or Number
            <option>Percent of Total</option>
            <option>Number of Votes</option>
          </select>
        </label>
        <label>Sanders Votes (Percent or Number)
          <input type="number" name="sanders_votes" />
        </label>
        <label>Clinton Votes (Percent or Number)
          <input type="number" name="clinton_votes" />
        </label>
        <label>Other Votes (Percent or Number)
          <input type="number" name="other_votes" />
        </label>
        <label>Percent Reporting
          <input type="number" name="percent_reporting" />
        </label>
        <label>Attribution
          <textarea name="attribution" />
        </label>
        <TimeSelect />
        <label><button type="submit">Submit</button></label>
        </form>
      </div>
    );
  }
}
