import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const isModernBrowser = Boolean(document.createElement('input').setSelectionRange);

export default class ContactInfo extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      formattedNumber: '+1',
    };
  }

  componentDidMount() {
    if (this.context.api.contact_info) {
      this.setState({ formattedNumber: this.context.api.contact_info }); //eslint-disable-line
    }
  }

  handleInput(event) {
    let formattedNumber = '+';
    const freezeSelection = this.state.freezeSelection;

    // Does not exceed 16 digit phone number limit
    if (event.target.value.replace(/\D/g, '').length > 11) {
      return;
    }

    // if the input is the same as before, must be some special key like enter etc.
    if (event.target.value === this.state.formattedNumber) {
      return;
    }

    // ie hack
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false; // eslint-disable-line
    }

    if (event.target.value.length > 0) {
      const inputNumber = event.target.value.replace(/\D/g, '');
      formattedNumber = this.formatNumber(inputNumber, '+. (...) ...-....');
    }

    let caretPosition = event.target.selectionStart;
    const oldFormattedText = this.state.formattedNumber;
    const diff = formattedNumber.length - oldFormattedText.length;

    this.setState({
      formattedNumber,
      freezeSelection,
    }, function afterStateSet() {
      if (isModernBrowser) {
        if (diff > 0) {
          caretPosition = caretPosition - diff;
        }

        if (caretPosition > 0 && oldFormattedText.length >= formattedNumber.length) {
          ReactDOM.findDOMNode(this.refs.numberInput)
            .setSelectionRange(caretPosition, caretPosition);
        }
      }

      if (this.props.onChange) {
        this.props.onChange(this.state.formattedNumber);
      }
    });
  }

  formatNumber(text, pattern) {
    if (!text || text.length === 0) {
      return '+1';
    }

    // for all strings with length less than 3, just return it (1, 2 etc.)
    // also return the same text if the selected country has no fixed format
    if ((text && text.length < 2) || !pattern) {
      return `+${text}`;
    }

    const formattedObject = pattern.split('').reduce((acc, character) => {
      if (acc.remainingText.length === 0) {
        return acc;
      }

      if (character !== '.') {
        return {
          formattedText: acc.formattedText + character,
          remainingText: acc.remainingText,
        };
      }

      return {
        formattedText: acc.formattedText + acc.remainingText[0],
        remainingText: acc.remainingText.slice(1),
      };
    }, { formattedText: '', remainingText: text.split('') });
    return formattedObject.formattedText + formattedObject.remainingText.join('');
  }

  handleChange(event) {
    this.handleInput(event);
    this.context.api.contact_info = event.target.value;
  }

  render() {
    return (
      <label>Your phone number:
        <input className={`contact-info ${this.props.className}`} type="text" name="contact_info"
          ref="numberInput"
          value={this.state.formattedNumber}
          onChange={this.handleChange} // eslint-disable-line
        />
        <span className="error-message">{this.props.errorMessage}</span>
        <span className="sub">(In case we have questions about this report,
          may we have your phone please?)</span>
      </label>
    );
  }
}

ContactInfo.propTypes = {
  onChange: React.PropTypes.func,
  className: React.PropTypes.string,
  errorMessage: React.PropTypes.string,
};

ContactInfo.contextTypes = {
  api: React.PropTypes.object,
};
