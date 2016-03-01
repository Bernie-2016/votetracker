import React from 'react';
import Submitable from './submitable';
import TimeSelect from './timeselect';
import classNames from 'classnames';

export default class PrimaryReport extends Submitable {

  render() {
    let statusMessage;
    if (this.state.submitted) {
      statusMessage = 'Submitted';
    }

    // check for errors to update class names
    let ballotsCastClass;
    if (this.state.errors) {
      ballotsCastClass = classNames({
        invalid_input: this.state.errors.ballots_cast,
      });
    }

    return (
      <div className="PrimaryReportForm">
        <form ref={this.trackForm}>
        <input type="hidden" value="primary" name="report_type" />
        <label>Ballot Type
          <select name="type">
            <option value="dem">Democratic Ballots</option>
            <option value="total">Total Ballots</option>
          </select>
        </label>
        <label>Ballots Cast:
          <input type="number" name="ballots_cast" className={ballotsCastClass} />
        </label>
        <TimeSelect />
        <label>
          <button type="submit" disabled={this.state.submitting}>Submit</button>
        {statusMessage} {this.state.errorMessage}</label>
        </form>
      </div>
    );
  }
}
