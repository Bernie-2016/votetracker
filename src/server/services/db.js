import dotenv from 'dotenv';
import bluebird from 'bluebird';
import db from 'pg-promise';

dotenv.config();
import config from '../config';

const pg = db({
  promiseLib: bluebird,
});

export default pg(config.db);
