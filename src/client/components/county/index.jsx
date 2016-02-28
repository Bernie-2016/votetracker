import React from 'react';

const counties = ['county1', 'county2', 'county3', 'county4'];

const County = () => (
	<div className="CountyForm">
    <form>
      <label>Select your County:
        {counties.map(county => (
          <div key={county}> {county} </div>
        ))}
      </label>
    </form>
  </div>
  );

export default County;
