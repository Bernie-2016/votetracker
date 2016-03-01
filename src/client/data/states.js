import states from '../../../fixtures/states.csv';
import counties from '../../../fixtures/counties.csv';
import importantCounties from '../../../fixtures/important.csv';
import moment from 'moment';
import find from 'array-find';

const parsedStates = states.map(({ state_code, name, election_day, type, open_closed }) => {
  const parsed = { state_code, name, type, open_closed };
  parsed.election_day = moment(election_day, 'M/D/YYYY');
  parsed.important = importantCounties.filter(entry => entry.state_code === state_code) // eslint-disable-line
    .map(entry => entry.county);
  parsed.counties = counties.filter(county => county.state_code === state_code) // eslint-disable-line
    .map(entry => entry.county_name.toUpperCase());

  return parsed;
}).sort((a, b) => a.name.localeCompare(b.name));

export default parsedStates;

export function validState(stateCode) {
  return parsedStates.some(state => state.state_code === stateCode);
}

export function findState(stateCode) {
  return find(parsedStates, state => state.state_code === stateCode);
}
