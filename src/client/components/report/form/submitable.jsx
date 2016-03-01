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
    this.state = {
    };
  }

  validate(data) {
    const errorMessage = {};
    let isInvalid = false;

    // different forms => different validation
    switch (data.report_type) {
      case 'caucus':
        {
          const fields = ['phase', 'sanders_supporters', 'clinton_supporters', 'other_supporters',
            'sanders_delegates', 'clinton_delegates', 'other_delegates'];
          fields.forEach((elem) => {
            // check for all fields
            if (!data[elem]) {
              errorMessage[elem] = 'This field is required.';
              isInvalid = true;
            }

            // check for ballots cast number
            if (elem !== 'phase' && data[elem]) {
              const value = parseInt(data[elem], 16);
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
          const fields = ['type', 'ballots_cast', 'report_age'];
          fields.forEach((elem) => {
            // check for all fields
            if (!data[elem]) {
              errorMessage[elem] = 'This field is required.';
              isInvalid = true;
            }

            // check for ballots cast number
            if (elem === 'ballots_cast' && data[elem]) {
              const ballotsCast = parseInt(data[elem], 16);
              if (typeof ballotsCast !== 'number' || ballotsCast < 0) {
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

  errored(message = null) {
    this.setState({ error: true, submitting: false, errorMessages: message });
  }

  submit(event) {
    this.setState({ error: false, submitting: true });
    const submitData = serialize(event.target, { hash: true });

    // check for client side form validity
    const isInvalid = this.validate(submitData);

    if (!isInvalid) {
      if (!window.clientId) {
        window.clientId = uuid.v1();
      }
      submitData.client_id = window.clientId;
      submitData.location_id = this.props.params.location;
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
    event.preventDefault();
  }

  trackForm(element) {
    if (!element && this.formElement) {
      this.formElement.removeEventListener('submit', this.submit);
    }
    this.formElement = element;
    if (element) {
      element.addEventListener('submit', this.submit);
    }
  }

}

SubmitableForm.propTypes = {
  params: React.PropTypes.object,
};

SubmitableForm.contextTypes = {
  router: React.PropTypes.object,
};
