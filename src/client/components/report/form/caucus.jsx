import React from 'react';
import Submitable from './submitable';
import TimeSelect from './timeselect';
import PrecinctInput from './precinct-input';

export default class CaucusReport extends Submitable {
  constructor() {
    super();
    this.state = { phase: 0 };
  }

  shouldThank() {
    return this.state.phase === 2;
  }

  trackForm(element) {
    super.trackForm(element);
    if (element) {
      this.phaseSelect = element.querySelector('select[name="phase"]');
    }
  }

  render() {
    const finalCount = this.state && this.state.phase === 2;
    const updatePhase = event => {
      const select = event.target;
      const value = select[select.selectedIndex].value;
      this.setState({ phase: +value });
    };
    let statusMessage;
    if (this.state.submitted) {
      statusMessage = 'Submitted';
    }
    return (
      <div className="CaucusReportForm">
        <form ref={this.trackForm}>
          <input type="hidden" value="caucus" name="report_type" />
          <PrecinctInput location={this.props.params.location} />
          <label>Phase:
            <select name="phase" onChange={updatePhase}>
              <option value="0">First Count</option>
              <option value="1">Second(or additional) Count</option>
              <option value="2">Final Count</option>
            </select>
          </label>

          <label>Sanders Supporters:
            <input type="number" name="sanders_supporters" />
          </label>
          <label>Clinton Supporters:
            <input type="number" name="clinton_supporters" />
          </label>
          <label>Other Supporters:
            <input type="number" name="other_supporters" />
          </label>
          <div hidden={!finalCount}>
            <label>Total Sanders Delegates:
              <input type="number" name="sanders_delegates" />
            </label>
            <label>Total Clinton Delegates:
              <input type="number" name="clinton_delegates" />
            </label>
            <label>Total Other Delegates:
              <input type="number" name="other_delegates" />
            </label>
          </div>
          <TimeSelect />
          <label>
            <button disabled={this.state.submitting} type="submit">Submit</button>
          {statusMessage}</label>
        </form>
      </div>
    );
  }
}
