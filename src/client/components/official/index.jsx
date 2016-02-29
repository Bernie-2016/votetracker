import React from 'react';
import Submitable from '../report/form/submitable';
import TimeSelect from '../report/form/timeselect';
import states from '../../data/states';

export default class OfficialReport extends Submitable {

  constructor() {
    super();
    this.state = {
      state: '',
      county: '',
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
    return (
      <div className="official report">
        <h2>Official Results</h2>
        <form ref={this.trackForm}>
          <input type="hidden" value="official" name="report_type" />
          <label>Select a State
            <select name="state"><option value="">---Select a State---</option>{states.map(state => { // eslint-disable-line
              return <option value={state.state_code} key={state.state_code}>{state.name}</option>; // eslint-disable-line
            })}</select>
          </label>

          <div hidden={!this.state.state}><label>
            Select a County
            <select name="county">
              <option value="">---Select a County---</option>
              {counties.map(county => { // eslint-disable-line
                return <option value={county} key={county}>{county}</option>; // eslint-disable-line
              })}
            </select>
          </label></div>

          <div className="form" hidden={!this.state.county}>
            <label>Are you reporting the number votes cast or the vote percentages?
              <select>
                <option>Vote Percentages</option>
                <option>Number of Votes</option>
              </select>
            </label>
            <label>Sanders Votes
              <input type="number" name="sanders_votes" />
            </label>
            <label>Clinton Votes
              <input type="number" name="clinton_votes" />
            </label>
            <label>Other Votes
              <input type="number" name="other_votes" />
            </label>
            <label>Percent Reporting
              <input type="number" name="percent_reporting" />
            </label>
            <label>Source Attribution
              <textarea name="attribution" />
            </label>
            <TimeSelect />
            <label><button type="submit">Submit</button></label>
          </div>
        </form>
      </div>
    );
  }
}

OfficialReport.contextTypes = {
  api: React.PropTypes.object,
};
