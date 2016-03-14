import db from '../../services/db';

import memoize from 'lodash.memoize';
import debugFactory from 'debug';

const debug = debugFactory('states');

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
    'SELECT DISTINCT upper(county) as county FROM precincts WHERE state_code = ${state}',
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
  params.empty = '';
  return db.query(
    'SELECT DISTINCT ' +
    ' pl.id, pl.pollinglocation, pl.pollingaddress, pl.pollingcity, pl.state_code, ' +
    ' coalesce(pl.pollingzip, \'\') as pollingzip ' +
    'FROM precincts AS p ' +
    '  LEFT JOIN precinct_polling_location as ppl ON p.id = ppl.precinct_id ' +
    '  LEFT JOIN polling_location AS pl ON pl.id = ppl.polling_location_id ' +
    'WHERE p.state_code = ${state} AND p.county = ${county} AND ' +
    '  NOT(pl.id IS NULL OR pl.pollinglocation=${empty})',
    params
  );
}, params => `${params.state},${params.county}`);

export function locations(req, res) {
  locationsQuery(req.params)
  .then(result => {
    res.send(result);
  });
}

const precinctsQuery = memoize(params => {
  debug('First Query', params);
  return db.query(
    'SELECT DISTINCT' +
    ' id, name' +
    ' FROM precincts WHERE state_code = ${state} AND county = ${county}' +
    'ORDER BY name',
    params
  );
}, params => `${params.state},${params.county}`);

export function precincts(req, res) {
  precinctsQuery(req.params)
  .then(result => {
    res.send(result);
  });
}
