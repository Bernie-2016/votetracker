import React from 'react';
import { Link } from 'react-router';

import Submitable from './submitable';
import TimeSelect from './timeselect';
import PrecinctInput from './precinct-input';
import ContactInfo from './contact-info';
import classNames from 'classnames';

export default class CaucusReport extends Submitable {
  constructor() {
    super();
    this.state = {
      phase: 0,
      caucusFields: [
        'phase',
        'precinct_id',
        'sanders_supporters',
        'clinton_supporters',
        'other_supporters',
        'undeclared_supporters',
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
    if (this.state.error) {
      statusMessage = 'Error submitting. Please check values and try again.';
    }

    // update class names
    this.state.caucusFields.forEach((elem) => {
      this.state.errorClasses[elem] = classNames({
        invalid_input: this.state.errorMessages[elem],
      });
    });

    return (
      <div className="CaucusReportForm">
      <p>You can ask your precinct captain, party official, or election official
          for any of the following counts.</p>
      <h5>First Count</h5>
      <p>The first count should occur after everyone has been checked in and the caucus doors
          have closed. The party official (or other representative) should instruct all attendees
          to stand in groups based on whom they are supporting.</p>
      <h5>Second Count</h5>
      <p>The second count or ‘re-alignment’ occurs if one of the groups from the first count isn’t
          “viable” (doesn’t have a minimum of 15% support). Supporters in the non-viable group will
          be asked to select another, viable group to support. After everyone is re-aligned, they’ll
          be counted again.</p>
      <h5>Final Count</h5>
      <p>After everyone is in a viable group, a final count will occur and delegates will be
          apportioned. You can get the total number of delegates for your precinct, as well as the
          total number of delegates assigned to each group.</p>
        <p>Questions? Check out our <Link to="/faq">FAQ.</Link></p>
        <form ref={this.trackForm}>
          <input type="hidden" value="caucus" name="report_type" />
          <PrecinctInput location={this.props.params.location}
            required
            className={this.state.errorClasses.precinct_id}
          >
            <span className="error-message">{this.state.errorMessages.precinct_id}</span>
          </PrecinctInput>
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
              defaultValue="0"
            />
            <span className="error-message">{this.state.errorMessages.sanders_supporters}</span>
          </label>
          <label>Clinton Supporters:
            <input type="number" name="clinton_supporters"
              className={this.state.errorClasses.clinton_supporters}
              defaultValue="0"
            />
            <span className="error-message">{this.state.errorMessages.clinton_supporters}</span>
          </label>
          <label>Other Supporters:
            <input type="number" name="other_supporters"
              className={this.state.errorClasses.other_supporters}
              defaultValue="0"
            />
            <span className="error-message">{this.state.errorMessages.other_supporters}</span>
          </label>
          <label>Undeclared Supporters:
            <input type="number" name="undeclared_supporters" defaultValue="0" />
          </label>
          <div hidden={!finalCount}>
            <label>Total Sanders Delegates:
              <input type="number" name="sanders_delegates"
                className={this.state.errorClasses.sanders_delegates}
                defaultValue="0"
              />
              <span className="error-message">{this.state.errorMessages.sanders_delegates}</span>
            </label>
            <label>Total Clinton Delegates:
              <input type="number" name="clinton_delegates"
                className={this.state.errorClasses.clinton_delegates}
                defaultValue="0"
              />
              <span className="error-message">{this.state.errorMessages.clinton_delegates}</span>
            </label>
            <label>Total Other Delegates:
              <input type="number" name="other_delegates"
                className={this.state.errorClasses.other_delegates}
                defaultValue="0"
              />
              <span className="error-message">{this.state.errorMessages.other_delegates}</span>
            </label>
          </div>
          <TimeSelect error={this.state.errorMessages.report_age}
            className={this.state.errorClasses.report_age}
          />
          <ContactInfo errorMessage={this.state.errorMessages.contact_info}
            className={this.state.errorClasses.contact_info}
          />
          <label>
            <button disabled={this.state.submitting} type="submit">Submit</button>
          {statusMessage}{this.errorMessage}</label>
        </form>
      </div>
    );
  }
}
