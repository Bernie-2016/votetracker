import React from 'react';

const ErrorMessage = ({ children = 'Something went wrong' }) => (
  <div className="error-message">
    Error: { children }
  </div>
);

ErrorMessage.propTypes = {
  children: React.PropTypes.node,
};

export default ErrorMessage;
