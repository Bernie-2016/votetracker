import React from 'react';
import Submitable from './submitable';
import TimeSelect from './timeselect';
import classNames from 'classnames';

export default class PrimaryReport extends Submitable {

  constructor() {
    super();

    if (!this.state.errorMessages) {
      this.state.errorMessages = {
        type: null,
        ballots_cast: null,
        report_age: null,
      };
    }
  }

  render() {
    let statusMessage;
    if (this.state.submitted) {
      statusMessage = 'Submitted';
    }

    // update class names
    let ballotsCastClass;
    if (this.state.errorMessages.ballots_cast) {
      ballotsCastClass = classNames({
        invalid_input: this.state.errorMessages.ballots_cast,
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
          <span className="error-message">{this.state.errorMessages.type}</span>
        </label>
        <label>Ballots Cast:
          <input type="number" name="ballots_cast" className={ballotsCastClass} />
           <span className="error-message">{this.state.errorMessages.ballots_cast}</span>
        </label>
        <TimeSelect error={this.state.errorMessages.report_age} />
        <label>
          <button type="submit" disabled={this.state.submitting}>Submit</button>
        {statusMessage}</label>
        </form>
      </div>
    );
  }
}
