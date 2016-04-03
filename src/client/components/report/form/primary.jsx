import React from 'react';
import { Link } from 'react-router';

import Submitable from './submitable';
import TimeSelect from './timeselect';
import PrecinctInput from './precinct-input';
import ContactInfo from './contact-info';
import classNames from 'classnames';

export default class PrimaryReport extends Submitable {

  constructor() {
    super();

    this.state = {
      primaryFields: [
        'type',
        'ballots_cast',
        'report_age',
        'contact_info',
        'precinct_id',
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
    if (this.state.error) {
      statusMessage = 'Error submitting. Please check values and try again.';
    }

    // update class names
    this.state.primaryFields.forEach((elem) => {
      this.state.errorClasses[elem] = classNames({
        invalid_input: this.state.errorMessages[elem],
      });
    });

    return (
      <div className="PrimaryReportForm">
        <p>You can get turnout totals from your election official after you cast your ballot or even
         before walking in. Just ask for the total number of ballots cast in the Democratic primary
         at your polling location.</p>
        <p>When they give you the totals, ask:</p>
        <p>Does this include early vote or absentee ballots?</p>
        <p>Does this cover multiple precincts? If so, which ones?</p>
        <p>Is this total for all ballots or for the total Democratic ballots?
         Preferably, ask for the Democratic ballot total.</p>
        <p>Questions? Check out our <Link to="/faq">FAQ.</Link></p>
        <form ref={this.trackForm}>
        <input type="hidden" value="primary" name="report_type" />
        <PrecinctInput location={this.props.params.location}
          className={this.state.errorClasses.precinct_id}
        >
          <span className="error-message">{this.state.errorMessages.precinct_id}</span>
        </PrecinctInput>
        <label>Report Type
          <select name="type" className={this.state.errorClasses.type}>
            <option value="">---Select Type---</option>
            <option value="dem">Democratic Ballots</option>
            <option value="total">Total Ballots</option>
          </select>
          <span className="error-message">{this.state.errorMessages.type}</span>
        </label>
        <label>Total Ballots Cast:
          <input type="number" name="ballots_cast"
            className={this.state.errorClasses.ballots_cast}
          />
          <span className="error-message">{this.state.errorMessages.ballots_cast}</span>
          <span className="reminder">
            Please include the total ballots cast, <strong>not just your own ballot.</strong>
          </span>
        </label>
        <label>
          This report includes Early/Absentee Ballots:
           <input type="checkbox" name="early_absentee" value="1" />
        </label>
        <TimeSelect error={this.state.errorMessages.report_age}
          className={this.state.errorClasses.report_age}
        />
        <ContactInfo errorMessage={this.state.errorMessages.contact_info}
          className={this.state.errorClasses.contact_info}
        />
        <label>
          <button type="submit" disabled={this.state.submitting}>Submit</button>
        {statusMessage} {this.state.errorMessage || this.errorMessage}</label>
        </form>
      </div>
    );
  }
}
