import React from 'react';
import Submitable from '../report/form/submitable';
import TimeSelect from '../report/form/timeselect';
import states from '../../data/states';
import classNames from 'classnames';

export default class OfficialReport extends Submitable {

  constructor() {
    super();
    this.state = {
      state: '',
      county: '',
      officialFields: [
        'state',
        'county',
        'sanders_votes',
        'clinton_votes',
        'other_votes',
        'percent_reporting',
        'attribution',
        'report_age',
      ],
      officialNumberFields: [
        'sanders_votes',
        'clinton_votes',
        'other_votes',
        'percent_reporting',
      ],
      errorMessages: {
        state: '',
        county: '',
        sanders_votes: '',
        clinton_votes: '',
        other_votes: '',
        percent_reporting: '',
        atribution: '',
        report_age: '',
      },
      errorClasses: {
        state: '',
        county: '',
        sanders_votes: '',
        clinton_votes: '',
        other_votes: '',
        percent_reporting: '',
        atribution: '',
        report_age: '',
      },
    };

    this.stateChange = this.stateChange.bind(this);
  }

  trackForm(element) {
    super.trackForm(element);
    if (element) {
      this.stateSelect = element.querySelector('select[name="state"]');
      this.countySelect = element.querySelector('select[name="county"]');
      element.addEventListener('change', this.stateChange);
    }
  }

  stateChange(event) {
    if (event.target === this.stateSelect) {
      const stateSelect = this.stateSelect;
      const stateValue = stateSelect[stateSelect.selectedIndex].value;

      this.setState({
        state: stateValue,
        counties: [],
        county: '',
      });
      this.context.api.getCounties(stateValue)
        .then(counties => this.setState({ counties }));
    }

    if (event.target === this.countySelect) {
      const countySelect = this.countySelect;
      const county = countySelect[countySelect.selectedIndex].value;

      this.setState({ county });
    }
  }

  render() {
    const counties = this.state && this.state.counties || [];
    let statusMessage;
    if (this.state.submitted) {
      statusMessage = 'Submitted';
    }

    // update class names
    this.state.officialFields.forEach((elem) => {
      this.state.errorClasses[elem] = classNames({
        invalid_input: this.state.errorMessages[elem],
      });
    });

    return (
      <div className="official report">
        <h2>Official Results</h2>
        <form ref={this.trackForm}>
          <input type="hidden" value="official" name="report_type" />
          <label>Select a State:
            <select name="state" className={this.state.errorClasses.state}><option value="">---Select a State---</option>{states.map(state => { // eslint-disable-line
              return <option value={state.state_code} key={state.state_code}>{state.name}</option>; // eslint-disable-line
            })}</select>
            <span className="error-message">{this.state.errorMessages.state}</span>
          </label>

          <div hidden={!this.state.state}><label>
            Select a County:
            <select name="county">
              <option value="">---Select a County---</option>
              {counties.map(county => { // eslint-disable-line
                return <option value={county} key={county}>{county}</option>; // eslint-disable-line
              })}
            </select>
            <span className="error-message">{this.state.errorMessages.county}</span>
          </label></div>

          <div className="form" hidden={!this.state.county}>
            <label>Are you reporting the number votes cast or the vote percentages?
              <select className={this.state.errorClasses.percentages}>
                <option>Vote Percentages</option>
                <option>Number of Votes</option>
              </select>
              <span className="error-message">{this.state.errorMessages.percentages}</span>
            </label>
            <label>Sanders Votes:
              <input type="number" name="sanders_votes"
                className={this.state.errorClasses.sanders_votes}
              />
             <span className="error-message">{this.state.errorMessages.sanders_votes}</span>
            </label>
            <label>Clinton Votes:
              <input type="number" name="clinton_votes"
                className={this.state.errorClasses.clinton_votes}
              />
             <span className="error-message">{this.state.errorMessages.clinton_votes}</span>
            </label>
            <label>Other Votes:
              <input type="number" name="other_votes"
                className={this.state.errorClasses.other_votes}
              />
             <span className="error-message">{this.state.errorMessages.other_votes}</span>
            </label>
            <label>Percent Reporting:
              <input type="number" name="percent_reporting"
                className={this.state.errorClasses.percent_reporting}
              />
             <span className="error-message">{this.state.errorMessages.percent_reporting}</span>
            </label>
            <label>Source Attribution:
              <textarea name="attribution" className={this.state.errorClasses.attribution} />
             <span className="error-message">{this.state.errorMessages.attribution}</span>
            </label>
            <TimeSelect error={this.state.errorMessages.report_age}
              className={this.state.errorClasses.report_age}
            />
            <label>
              <button disabled={this.state.submitting} type="submit">Submit</button>
            {statusMessage}</label>
          </div>
        </form>
      </div>
    );
  }
}

OfficialReport.contextTypes = {
  api: React.PropTypes.object,
};
