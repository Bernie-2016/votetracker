import db from '../../services/db';

import memoize from 'lodash.memoize';
import Debug from 'debug';

const debug = Debug('states');

import { dsvFormat } from 'd3-dsv';
import fs from 'fs';
import path from 'path';

const states = dsvFormat(',').parse(
  fs.readFileSync(path.resolve(__dirname, '../../../../fixtures/states.csv'), 'utf-8'));

export function read(req, res) {
  res.send(states);
}

const countiesQuery = memoize(params => {
  debug('Caching Counties for', params);
  return db.query(
    'SELECT DISTINCT upper(county) as county FROM precinct_data WHERE state_code = ${state}',
    params
  );
}, params => params.state);

export function counties(req, res) {
  countiesQuery(req.params)
  .then(result => {
    res.send(result.map(row => row.county).sort());
  });
}

const locationsQuery = memoize(params => {
  debug('First Query', params);
  return db.query(
    'SELECT DISTINCT' +
    ' precinctID as id, pollinglocation, pollingaddress, pollingcity, state_code, pollingzip' +
    ' FROM precinct_data WHERE state_code = ${state} AND county = ${county}',
    params
  );
}, params => `${params.state},${params.county}`);

export function locations(req, res) {
  locationsQuery(req.params)
  .then(result => {
    res.send(result);
  });
}
