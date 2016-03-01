import React from 'react';
import Submitable from './submitable';
import TimeSelect from './timeselect';
import PrecinctInput from './precinct-input';
import ContactInfo from './contact-info';
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
    if (this.state.error) {
      statusMessage = 'Error submitting. Please check values and try again.';
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
        <PrecinctInput location={this.props.params.location} />
        <label>Report Type
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
        <label>
          Inclues Early/Absentee Ballots: <input type="checkbox" name="early_absentee" value="1" />
        </label>
        <TimeSelect error={this.state.errorMessages.report_age} />
        <ContactInfo />
        <label>
          <button type="submit" disabled={this.state.submitting}>Submit</button>
        {statusMessage} {this.state.errorMessage || this.errorMessage}</label>
        </form>
      </div>
    );
  }
}
