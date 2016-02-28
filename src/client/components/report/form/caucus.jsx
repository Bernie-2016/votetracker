import React from 'react';
import Submitable from './submitable';
import TimeSelect from './timeselect';

export default class CaucusReport extends Submitable {
  render() {
    return (
      <div className="CaucusReportForm">
        <form ref={this.trackForm}>
          <label>Phase:
            <select name="phase">
              <option value="0">First Count</option>
              <option value="1">Second(or additional) Count</option>
              <option value="2">Final Count</option>
            </select>
          </label>

          <label>Sanders Supporters:
            <input type="number" name="sanders_supporters" />
          </label>
          <label>Clinton Supporters:
            <input type="number" name="clinton_supporters" />
          </label>
          <label>Other Supporters:
            <input type="number" name="other_supporters" />
          </label>
          <label>Total Sanders Delegates:
            <input type="number" name="sanders_delegates" />
          </label>
          <label>Total Clinton Delegates:
            <input type="number" name="clinton_delegates" />
          </label>
          <label>Total Other Delegates:
            <input type="number" name="other_delegates" />
          </label>
          <TimeSelect />
          <label><button type="submit">Submit</button></label>
        </form>
      </div>
    );
  }
}
