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

  shouldThank() {
    return true;
  }

  submitted() {
    this.setState({ submitted: true, submitting: false });
    if (this.context.router && this.shouldThank()) {
      this.context.router.push('/thank-you');
    }
  }

  errored() {
    this.setState({ error: true, submitting: false });
  }

  change() {
    this.setState({ submitted: false, error: false });
  }

  submit(event) {
    this.setState({ error: false, submitting: true });
    const submitData = serialize(event.target, { hash: true });
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
    event.preventDefault();
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
