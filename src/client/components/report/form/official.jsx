import React from 'react';
import Submitable from './submitable';

export default class OfficialReport extends Submitable {

  render() {
    return (
      <div className="OfficialReportForm">
        <form ref={this.trackForm}>
        <label>Bernie Votes
          <input type="number" name="bernie_votes" />
        </label>
        <label>Clinton Votes
          <input type="number" name="clinton_votes" />
        </label>
        <label>Other Votes
          <input type="number" name="other_votes" />
        </label>
        <label>Percent Reporting
          <input type="number" name="percent_reporting" />
        </label>
        <label>Attribution
          <textarea name="attribution" />
        </label>
        <label><button type="submit">Submit</button></label>
        </form>
      </div>
    );
  }
}
