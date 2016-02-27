import db from '../../services/db';

import { dsvFormat } from 'd3-dsv';
import fs from 'fs';
import path from 'path';

const states = dsvFormat(',').parse(
  fs.readFileSync(path.resolve(__dirname, '../../../../fixtures/states.csv'), 'utf-8'));

export function read(req, res) {
  res.send(states);
}

export function counties(req, res) {
  db.query('SELECT DISTINCT upper(county) as county FROM precinct_data WHERE state_code = $1', req.params.state)
  .then(result => {
    res.send(result.map(row => row.county).sort());
  });
}
