import React, { Component } from 'react';

export default class ContactInfo extends Component {
  render() {
    return (
      <label>Contact Info:
        <input className="contact-info" type="text" name="contact_info"
          defaultValue={this.context.api.contact_info}
          onChange={(event) => { this.context.api.contact_info = event.target.value; }} // eslint-disable-line
        />
        <span className="sub">
          (Optional: in case we have questions about this report, may we have your e-mail or phone?)
        </span>
      </label>
    );
  }
}

ContactInfo.contextTypes = {
  api: React.PropTypes.object,
};
