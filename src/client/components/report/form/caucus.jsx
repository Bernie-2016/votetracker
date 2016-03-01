import React from 'react';
import Submitable from './submitable';
import TimeSelect from './timeselect';
import classNames from 'classnames';

export default class CaucusReport extends Submitable {
  constructor() {
    super();
    this.state = {
      phase: 0,
      caucusFields: [
        'phase',
        'sanders_supporters',
        'clinton_supporters',
        'other_supporters',
        'sanders_delegates',
        'clinton_delegates',
        'other_delegates',
      ],
      caucusFinalFields: [
        'sanders_delegates',
        'clinton_delegates',
        'other_delegates',
      ],
      errorMessages: {
        phase: null,
        sanders_supporters: null,
        clinton_supporters: null,
        other_supporters: null,
        sanders_delegates: null,
        clinton_delegates: null,
        other_delegates: null,
      },
      errorClasses: {
        phase: null,
        sanders_supporters: null,
        clinton_supporters: null,
        other_supporters: null,
        sanders_delegates: null,
        clinton_delegates: null,
        other_delegates: null,
      },
    };
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

    // update class names
    this.state.caucusFields.forEach((elem) => {
      this.state.errorClasses[elem] = classNames({
        invalid_input: this.state.errorMessages[elem],
      });
    });

    return (
      <div className="CaucusReportForm">
        <form ref={this.trackForm}>
          <input type="hidden" value="caucus" name="report_type" />
          <label>Phase:
            <select name="phase" onChange={updatePhase}>
              <option value="0">First Count</option>
              <option value="1">Second(or additional) Count</option>
              <option value="2">Final Count</option>
            </select>
            <span className="error-message">{this.state.errorMessages.phase}</span>
          </label>

          <label>Sanders Supporters:
            <input type="number" name="sanders_supporters"
              className={this.state.errorClasses.sanders_supporters}
            />
            <span className="error-message">{this.state.errorMessages.sanders_supporters}</span>
          </label>
          <label>Clinton Supporters:
            <input type="number" name="clinton_supporters"
              className={this.state.errorClasses.clinton_supporters}
            />
            <span className="error-message">{this.state.errorMessages.clinton_supporters}</span>
          </label>
          <label>Other Supporters:
            <input type="number" name="other_supporters"
              className={this.state.errorClasses.other_supporters}
            />
            <span className="error-message">{this.state.errorMessages.other_supporters}</span>
          </label>
          <div hidden={!finalCount}>
            <label>Total Sanders Delegates:
              <input type="number" name="sanders_delegates"
                className={this.state.errorClasses.sanders_delegates}
              />
              <span className="error-message">{this.state.errorMessages.sanders_delegates}</span>
            </label>
            <label>Total Clinton Delegates:
              <input type="number" name="clinton_delegates"
                className={this.state.errorClasses.clinton_delegates}
              />
              <span className="error-message">{this.state.errorMessages.clinton_delegates}</span>
            </label>
            <label>Total Other Delegates:
              <input type="number" name="other_delegates"
                className={this.state.errorClasses.other_delegates}
              />
              <span className="error-message">{this.state.errorMessages.other_delegates}</span>
            </label>
          </div>
          <TimeSelect error={this.state.errorMessages.report_age}
            className={this.state.errorClasses.report_age}
          />
          <label>
            <button disabled={this.state.submitting} type="submit">Submit</button>
          {statusMessage}</label>
        </form>
      </div>
    );
  }
}
