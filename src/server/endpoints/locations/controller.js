import db from '../../services/db';

import memoize from 'lodash.memoize';
import debugFactory from 'debug';

const debug = debugFactory('locations');

const precinctsQuery = memoize(params => {
  debug('Caching Counties for', params);
  return db.query(
    'SELECT precincts.* FROM precinct_polling_location as ppl ' +
    'LEFT JOIN precincts ON ppl.precinct_id = precincts.id WHERE ppl.polling_location_id = ${id}',
    params
  );
}, params => params.id);

export function precincts(req, res) {
  precinctsQuery(req.params)
  .then(result => {
    res.send(result);
  });
}
