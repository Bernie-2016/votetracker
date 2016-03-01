import React from 'react';
import Submitable from './submitable';
import TimeSelect from './timeselect';
import PrecinctInput from './precinct-input';
import ContactInfo from './contact-info';

export default class PrimaryReport extends Submitable {

  render() {
    let statusMessage;
    if (this.state.submitted) {
      statusMessage = 'Submitted';
    }
    if (this.state.error) {
      statusMessage = 'Error submitting. Please check values and try again.';
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
        </label>
        <label>Ballots Cast:
          <input type="number" name="ballots_cast" />
        </label>
        <TimeSelect />
        <ContactInfo />
        <label>
          <button type="submit" disabled={this.state.submitting}>Submit</button>
        {statusMessage}{this.errorMessage}</label>
        </form>
      </div>
    );
  }
}
