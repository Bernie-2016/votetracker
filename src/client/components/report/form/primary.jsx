import React from 'react';
import Submitable from './submitable';
import TimeSelect from './timeselect';
import classNames from 'classnames';

export default class PrimaryReport extends Submitable {

  constructor() {
    super();

    this.state = {
      primaryFields: [
        'type',
        'ballots_cast',
        'report_age',
      ],
      errorMessages: {
        type: null,
        ballots_cast: null,
        report_age: null,
      },
      errorClasses: {
        type: null,
        ballots_cast: null,
        report_age: null,
      },
    };
  }

  render() {
    let statusMessage;
    if (this.state.submitted) {
      statusMessage = 'Submitted';
    }

    // update class names
    this.state.primaryFields.forEach((elem) => {
      this.state.errorClasses[elem] = classNames({
        invalid_input: this.state.errorMessages[elem],
      });
    });

    return (
      <div className="PrimaryReportForm">
        <form ref={this.trackForm}>
        <input type="hidden" value="primary" name="report_type" />
        <label>Ballot Type
          <select name="type" className={this.state.errorClasses.type}>
            <option value="dem">Democratic Ballots</option>
            <option value="total">Total Ballots</option>
          </select>
          <span className="error-message">{this.state.errorMessages.type}</span>
        </label>
        <label>Ballots Cast:
          <input type="number" name="ballots_cast"
            className={this.state.errorClasses.ballots_cast}
          />
           <span className="error-message">{this.state.errorMessages.ballots_cast}</span>
        </label>
        <TimeSelect error={this.state.errorMessages.report_age}
          className={this.state.errorClasses.report_age}
        />
        <label>
          <button type="submit" disabled={this.state.submitting}>Submit</button>
        {statusMessage}</label>
        </form>
      </div>
    );
  }
}
