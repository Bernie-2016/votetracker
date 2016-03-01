import { dsvFormat } from 'd3-dsv';
import fs from 'fs';
import path from 'path';

const states = dsvFormat(',').parse(
  fs.readFileSync(path.resolve(__dirname, '../../../../fixtures/states.csv'), 'utf-8'));

export default states;
