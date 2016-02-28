import React from 'react';
import Submitable from './submitable';

export default class PrimaryReport extends Submitable {

  render() {
    return (
      <div className="PrimaryReportForm">
        <form ref={this.trackForm}>
        <label>Ballot Type
          <select name="type">
            <option value="dem">Democratic Ballots</option>
            <option value="total">Total Ballots</option>
          </select>
        </label>
        <label>Ballots Cast
          <input type="number" name="ballots_cast" />
        </label>
        <label><button type="submit">Submit</button></label>
        </form>
      </div>
    );
  }
}
