import React from 'react';

const Report = ({ params }) => (
    <h1>Report { params.state }</h1>
);

Report.propTypes = {
  params: React.PropTypes.object,
};

export default Report;
