import React from 'react';

const counties = ['county1', 'county2', 'county3', 'county4'];
const locations = ['loc1', 'loc2', 'loc3'];

const PrimaryReport = () => (
  // select county
  // select polling location
  // field for total Dem ballots cast
  <div className="PrimaryReportForm">
    <form>


    <label>Select your County:
      {counties.map(county => (
        <div key={county}> {county} </div>
      ))}
    </label>

    <label>Select your Location:
      {locations.map(location => (
        <div key={location}> {location} </div>
      ))}
    </label>

    </form>
  </div>
);

export default PrimaryReport;

    // <label>Total Democratic Ballots Cast
    //   <input type="number" name="ballots-cast" />
    // </label>


  // select county/precinct
  // phase/report type: dropdown -- [ First Count, Second Count, Final Delegate Count ]
  // Sanders Supporters: ####
  // Clinton Supporters: ####
  // O’Malley Supporters: ####
  // Other(uncommitted) Supporters: ####
  // (only on delegate counts)
  // ^^^ Delegates for each type: ####
