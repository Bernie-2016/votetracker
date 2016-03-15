import db from '../../services/db';
import moment from 'moment';

const insert = (table, data) => {
  const keys = Object.keys(data);
  const fields = keys.join(',');
  const values = keys.map(field => `\${${field}}`).join(',');
  const query = `INSERT INTO ${table} (${fields}) VALUES (${values})`;
  return db.query(query, data);
};

const getFloatTime = reportAge => {
  const now = moment().subtract(reportAge, 'minutes');
  return now.hours() + Math.round(now.minutes() / 30) / 2;
};

const getIp = req => (
  (req.headers['x-forwarded-for'] || req.connection.remoteAddress).split(',')[0]
);

const submit = {
  caucus: (req, res) => {
    const data = {
      phase: +req.body.phase,
      report_age: +req.body.report_age / 60,
      client_id: req.body.client_id,
      location_id: +req.body.location_id,
      precinct_id: +req.body.precinct_id || null,
      sanders_supporters: +req.body.sanders_supporters || 0,
      clinton_supporters: +req.body.clinton_supporters || 0,
      other_supporters: +req.body.other_supporters || 0,
      undeclared_supporters: +req.body.undeclared_supporters || 0,
      sanders_delegates: +req.body.sanders_delegates || 0,
      clinton_delegates: +req.body.clinton_delegates || 0,
      other_delegates: +req.body.other_delegates || 0,
      float_time: getFloatTime(+req.body.report_age || 0),
      ip: getIp(req),
      contact_info: req.body.contact_info || '',
    };
    insert('caucus_report', data)
      .then(() => {
        res.sendStatus(204);
      }, (err) => {
        console.error(err, data); //eslint-disable-line
        res.sendStatus(400);
      });
  },
  primary: (req, res) => {
    const data = {
      type: req.body.type,
      client_id: req.body.client_id,
      location_id: +req.body.location_id,
      precinct_id: +req.body.precinct_id || null,
      report_age: +req.body.report_age / 60,
      ballots_cast: +req.body.ballots_cast,
      float_time: getFloatTime(+req.body.report_age || 0),
      ip: getIp(req),
      contact_info: req.body.contact_info || '',
      early_absentee: req.body.early_absentee || 0,
    };
    insert('primary_report', data)
      .then(() => {
        res.sendStatus(204);
      }, (err) => {
        console.error(err, data); //eslint-disable-line
        res.sendStatus(400);
      });
  },
  official: (req, res) => {
    const data = {
      client_id: req.body.type,
      precinct_id: +req.body.precinct_id || null,
      clinton_votes: +req.body.clinton_votes || 0,
      sanders_votes: +req.body.sanders_votes || 0,
      other_votes: +req.body.other_votes || 0,
      percent_reporting: +req.body.percent_reporting,
      state: req.body.state,
      county: req.body.county,
      location_id: +req.body.location_id || 0,
      float_time: getFloatTime(+req.body.report_age || 0),
      ip: getIp(req),
      contact_info: req.body.contact_info || '',
    };
    insert('official_report', data)
      .then(() => {
        res.sendStatus(204);
      }, (err) => {
        console.error(err, data); //eslint-disable-line
        res.sendStatus(400);
      });
  },
};

export function create(req, res) {
  const processFn = submit[req.body.report_type];
  if (!processFn) {
    return res.sendStatus(406);
  }
  if (!req.body.contact_info.match(/^\+1 \(\d{3}\) \d{3}-\d{4}$/)) {
    return res.sendStatus(406);
  }
  if (!req.body.precinct_id) {
    return res.sendStatus(406);
  }
  processFn(req, res);
}
