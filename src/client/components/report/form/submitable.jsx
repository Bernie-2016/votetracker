import React, { Component } from 'react';
import serialize from 'form-serialize';
import uuid from 'node-uuid';

export default class SubmitableForm extends Component {
  constructor() {
    super();
    this.trackForm = this.trackForm.bind(this);
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
    console.log('Would submit', submitData, 'to /report');
    event.preventDefault();
  }

  trackForm(element) {
    this.formElement = element;
    this.formElement.addEventListener('submit', this.submit.bind(this));
  }

}

SubmitableForm.propTypes = {
  params: React.PropTypes.object,
};
