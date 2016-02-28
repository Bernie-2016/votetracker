import React from 'react';

const locations = ['pre1', 'pre2', 'pre3'];

const Location = () => (
  <div className="LocationForm">
    <form>
      <label>Select your Location:
        {locations.map(location => (
          <div key={location}> {location} </div>
        ))}
      </label>
    </form>
  </div>
  );

export default Location;
