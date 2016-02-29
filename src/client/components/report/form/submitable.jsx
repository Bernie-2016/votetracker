import React, { Component } from 'react';
import serialize from 'form-serialize';
import uuid from 'node-uuid';

export default class SubmitableForm extends Component {
  constructor() {
    super();
    this.trackForm = this.trackForm.bind(this);
    const submitFn = this.submit || function empty() {};
    this.submit = submitFn.bind(this);
    this.state = {
    };
  }

  submitted() {
    this.setState({ submitting: false });
  }

  errored() {
    this.setState({ error: true, submitting: false });
  }

  submit(event) {
    this.setState({ error: false, submitting: true });
    const submitData = serialize(event.target, { hash: true });
    if (!window.clientId) {
      window.clientId = uuid.v1();
    }
    submitData.client_id = window.clientId;
    submitData.location_id = this.props.params.location;
    console.log('Would submit', submitData, 'to /api/report'); // eslint-disable-line
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
