import states from '../../../fixtures/states.csv';
import moment from 'moment';

const parsedStates = states.map(({ state_code, name, election_day, type, open_closed }) => {
  const parsed = { state_code, name, type, open_closed };
  parsed.election_day = moment(election_day, 'M/D/YYYY');

  return parsed;
});

export default parsedStates;
