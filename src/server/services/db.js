import dotenv from 'dotenv';
import bluebird from 'bluebird';
import db from 'pg-promise';

dotenv.config();

const pg = db({
  promiseLib: bluebird,
});

export default pg({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
