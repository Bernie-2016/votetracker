import React from 'react';
import Submitable from '../report/form/submitable';
import TimeSelect from '../report/form/timeselect';
import PrecinctInput from '../report/form/precinct-input';
import ContactInfo from '../report/form/contact-info';
import states, { findState } from '../../data/states';

export default class OfficialReport extends Submitable {

  constructor() {
    super();
    this.state = {
      state: '',
      county: '',
    };

    this.stateChange = this.stateChange.bind(this);
  }

  stateChange(event) {
    if (event.target.name === 'state') {
      const stateSelect = event.target;
      const stateValue = stateSelect[stateSelect.selectedIndex].value;

      this.setState({
        state: stateValue,
        stateObj: findState(stateValue),
        counties: [],
        county: '',
      });
      this.context.api.getCounties(stateValue)
        .then(counties => this.setState({ counties }));
    }

    if (event.target.name === 'county') {
      const countySelect = event.target;
      const county = countySelect[countySelect.selectedIndex].value;

      this.setState({ county });
    }
    if (['county', 'state', 'precinct_id'].indexOf(event.target.name) !== -1) {
      [].forEach.call(this.formElement.querySelectorAll('input'), input => {
        input.value = ''; // eslint-disable-line
      });
    }
  }

  render() {
    const counties = this.state && this.state.counties || [];
    let statusMessage;
    if (this.state.submitted) {
      statusMessage = 'Submitted';
    }
    if (this.state.error) {
      statusMessage = 'Error submitting. Please check values and try again.';
    }
    const county = this.state.county;
    const needsPrecinct = county && this.state.stateObj.important.indexOf(county) !== -1;

    return (
      <div className="official report">
        <h2>Official Results</h2>
        <form ref={this.trackForm} onChange={this.stateChange}>
        <h5>Thank you so much for what you’re doing.</h5>
        <p>This page is designed to take multiple results from several counties, across states
          without having to refresh or reload.</p>
        <p>Put in the either the total number of votes or the percentages for any one report.</p>
        <p>If you’ve been assigned a county where we’re requesting precinct information, please
          send those over as well.</p>
        <p>It’s recommended to have multiple sources (one government and one news source), and to
          select whichever one updates more quickly.</p>
        <form ref={this.trackForm}>
          <input type="hidden" value="official" name="report_type" />
          <label>Select a State:
            <select name="state"><option value="">---Select a State---</option>{states.map(state => { // eslint-disable-line
              return <option value={state.state_code} key={state.state_code}>{state.name}</option>; // eslint-disable-line
            })}</select>
          </label>

          <div hidden={!this.state.state}><label>
            Select a County:
            <select name="county">
              <option value="">---Select a County---</option>
              {counties.map(county => { // eslint-disable-line
                return <option value={county} key={county}>{county}</option>; // eslint-disable-line
              })}
            </select>
          </label></div>

          <div hidden={!needsPrecinct}>
            <PrecinctInput state={this.state.state}
              county={needsPrecinct ? this.state.county : ''}
            />
          </div>

          <div className="form" hidden={!this.state.county}>
            <label>Are you reporting the number of votes cast or the vote percentages?
              <select>
                <option>Vote Percentages</option>
                <option>Number of Votes</option>
              </select>
            </label>
            <label>Sanders Votes:
              <input type="number" name="sanders_votes" />
            </label>
            <label>Clinton Votes:
              <input type="number" name="clinton_votes" />
            </label>
            <label>Other Votes:
              <input type="number" name="other_votes" />
            </label>
            <label>Percent Reporting:
              <input type="number" name="percent_reporting" />
            </label>
            <label>Source Attribution:
              <textarea name="attribution" />
            </label>
            <TimeSelect />
            <ContactInfo />
            <label>
              <button disabled={this.state.submitting} type="submit">Submit</button>
            {statusMessage}{this.error}</label>
          </div>
        </form>
      </div>
    );
  }
}

OfficialReport.contextTypes = {
  api: React.PropTypes.object,
  state: React.PropTypes.object,
};
