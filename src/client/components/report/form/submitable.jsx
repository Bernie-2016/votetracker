import React, { Component } from 'react';
import serialize from 'form-serialize';
import uuid from 'node-uuid';
import superagent from 'superagent';

export default class SubmitableForm extends Component {
  constructor() {
    super();
    this.trackForm = this.trackForm.bind(this);
    const submitFn = this.submit || function empty() {};
    this.submit = submitFn.bind(this);
    this.change = this.change.bind(this);
    this.state = {
    };
  }

  validate(data) {
    // takes the data from the form and returns whether it's valid or not
    const errorMessage = {};
    let isInvalid = false;

    if (!data.contact_info.match(/^\+1 \(\d{3}\) \d{3}-\d{4}$/)) {
      errorMessage.contact_info = 'Must be in +1 (###) ###-#### format';
      isInvalid = true;
    }

    // different forms => different validation
    switch (data.report_type) {
      case 'caucus':
        {
          this.state.caucusFields.forEach((elem) => {
            // check for all fields
            const isInFinalForm = (this.state.caucusFinalFields.indexOf(elem) > -1);

            // if values doesn't exist and it's not in final form
            // ( or it is in final form and that form is on), it's invalid
            if (!data[elem] && (!isInFinalForm || (isInFinalForm && data.phase === '2'))) {
              errorMessage[elem] = 'This field is required.';
              isInvalid = true;
            }

            // check for values that have to be numbers
            if (elem !== 'phase' && data[elem]) {
              const value = parseInt(data[elem], 10);
              if (typeof value !== 'number' || value < 0) {
                errorMessage[elem] = 'This value must be a positive number.';
                isInvalid = true;
              }
            }
          });
          break;
        }
      case 'primary':
        {
          this.state.primaryFields.forEach((elem) => {
            // check for all fields
            if (!data[elem]) {
              errorMessage[elem] = 'This field is required.';
              isInvalid = true;
            }

            // check for ballots cast number
            if (elem === 'ballots_cast' && data[elem]) {
              const ballotsCast = parseInt(data[elem], 10);
              if (typeof ballotsCast !== 'number' || ballotsCast < 2) {
                errorMessage[elem] = 'This value must be greater than one.';
                isInvalid = true;
              }
            }
          });
          break;
        }
      case 'official':
        {
          this.state.officialFields.forEach((elem) => {
            // check for all fields
            if (!data[elem]) {
              errorMessage[elem] = 'This field is required.';
              isInvalid = true;
            }

            // check votes and percent for numeric values
            const isNumberInput = (this.state.officialNumberFields.indexOf(elem) > -1);
            if (data[elem] && isNumberInput) {
              const value = parseInt(data[elem], 10);
              if (typeof value !== 'number' || value < 0) {
                errorMessage[elem] = 'This value must be a positive number.';
                isInvalid = true;
              }
            }
          });
          break;
        }
      default:
        return isInvalid;
    }

    if (Object.getOwnPropertyNames(errorMessage).length !== 0) {
      this.errored(errorMessage);
    } else {
      this.reportErrorMessages(errorMessage);
    }

    return isInvalid;
  }

  shouldThank() {
    return true;
  }

  submitted() {
    this.setState({ submitted: true, submitting: false });
    if (this.context.router && this.shouldThank()) {
      this.context.router.push('/thank-you');
    }
  }

  reportErrorMessages(message = null) {
    // sends messages even if there are none, to reset form errors on submit
    this.setState({ errorMessages: message });
  }

  errored(message = null) {
    this.setState({ error: true, submitting: false, submitted: false });
    this.reportErrorMessages(message);
  }

  change() {
    this.setState({ submitted: false, error: false });
  }

  submit(event) {
    this.setState({ error: false, submitting: true });
    const submitData = serialize(event.target, { hash: true });

    // check for client side form validity
    const isInvalid = this.validate(submitData);

    event.preventDefault();

    if (isInvalid) {
      return;
    }

    if (!window.clientId) {
      window.clientId = uuid.v1();
    }

    submitData.client_id = window.clientId;
    submitData.location_id = this.props.params.location;
    if (typeof window.ga === 'function') {
      window.ga('send', 'event', 'report', submitData.report_type);
    }
    superagent.post('/api/report')
      .send(submitData)
      .set('Accept', 'application/json')
      .end((err, res) => {
        console.log(err, res); // eslint-disable-line
        if (err || !res.noContent) {
          this.errored();
        } else {
          this.submitted();
        }
      });
  }

  trackForm(element) {
    if (!element && this.formElement) {
      this.formElement.removeEventListener('submit', this.submit);
      this.formElement.removeEventListener('change', this.change);
    }
    this.formElement = element;
    if (element) {
      element.addEventListener('submit', this.submit);
      element.addEventListener('change', this.change);
    }
  }

}

SubmitableForm.propTypes = {
  params: React.PropTypes.object,
};

SubmitableForm.contextTypes = {
  router: React.PropTypes.object,
};
