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
          <label>Select a State
            <select name="state"><option value="">---Select A State---</option>{states.map(state => { // eslint-disable-line
              return <option value={state.state_code} key={state.state_code}>{state.name}</option>; // eslint-disable-line
            })}</select>
          </label>

          <div hidden={!this.state.state}><label>
            Select A County
            <select name="county">
              <option value="">---Select A County---</option>
              {counties.map(county => { // eslint-disable-line
                return <option value={county} key={county}>{county}</option>; // eslint-disable-line
              })}
            </select>
          </label></div>

          <div className="form" hidden={!this.state.county}>
            <p>
              Please select whether this report is for the number of ballots cast or the percent
              of the total vote. Then enter the number or percent of votes for Sanders, Clinton,
              or Other. Include the source of this information, and the time at which it was
              reported.
            </p>

            <label>
              <select>Percent or Number
                <option>Percent of Total</option>
                <option>Number of Votes</option>
              </select>
            </label>
            <label>Sanders Votes (Percent or Number)
              <input type="number" name="sanders_votes" />
            </label>
            <label>Clinton Votes (Percent or Number)
              <input type="number" name="clinton_votes" />
            </label>
            <label>Other Votes (Percent or Number)
              <input type="number" name="other_votes" />
            </label>
            <label>Percent Reporting
              <input type="number" name="percent_reporting" />
            </label>
            <label>Attribution
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
