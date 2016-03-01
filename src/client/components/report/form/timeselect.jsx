import React from 'react';

const TimeSelect = () => (
  <label>How recent is this report?
    <select name="report_age">
      <option value="0">Right Now</option>
      <option value="15">15 minutes ago</option>
      <option value="30">30 minutes ago</option>
      <option value="60">An hour ago</option>
      <option value="90">An hour and a half ago</option>
      <option value="120">Two hours ago</option>
      <option value="150">Two and a half hours ago</option>
      <option value="210">Three or more hours ago</option>
    </select>
  </label>
);

export default TimeSelect;
