import React from 'react';

const precincts = ['pre1', 'pre2', 'pre3'];

const Precinct = () => (
  <div className="PrecinctForm">
    <form>
      <label>Select your Precinct:
        {precincts.map(precinct => (
          <div key={precinct}> {precinct} </div>
        ))}
      </label>
    </form>
  </div>
  );

export default Precinct;
