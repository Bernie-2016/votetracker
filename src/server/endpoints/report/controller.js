import db from '../../services/db';

const insert = (table, data) => {
  const keys = Object.keys(data);
  const fields = keys.join(',');
  const values = keys.map(field => `\${${field}}`).join(',');
  const query = `INSERT INTO ${table} (${fields}) VALUES (${values})`;
  return db.query(query, data);
}

const submit = {
  caucus: (req, res) => {
    const data = {
      phase: +req.body.phase,
      report_age: +req.body.report_age,
      client_id: req.body.client_id,
      location_id: +req.body.location_id,
      precinct_id: +req.body.precinct_id || null,
      sanders_supporters: +req.body.sanders_supporters || 0,
      clinton_supporters: +req.body.clinton_supporters || 0,
      other_supporters: +req.body.other_supporters || 0,
    };
    insert('caucus_report', data)
      .then(() => {
        res.sendStatus(204);
      }, () => {
        res.sendStatus(400);
      });
  },
  primary: (req, res) => {
    const data = {
      type: req.body.type,
      client_id: req.body.client_id,
      location_id: +req.body.location_id,
      precinct_id: +req.body.precinct_id || null,
      report_age: +req.body.report_age,
      ballots_cast: +req.body.ballots_cast,
    };
    insert('primary_report', data)
      .then(() => {
        res.sendStatus(204);
      }, () => {
        res.sendStatus(400);
      });
  },
  official: (req, res) => {
    const data = {
      client_id: req.body.type,
      precinct_id: +req.body.precinct_id || null,
      clinton_votes: +req.body.clinton_votes,
      sanders_votes: +req.body.sanders_votes,
      other_votes: +req.body.other_votes,
      percent_reporting: +req.body.percent_reporting,
      state: req.body.state,
      county: req.body.county,
      location_id: +req.body.location_id || 0,
    };
    insert('official_report', data)
      .then(() => {
        res.sendStatus(204);
      }, () => {
        res.sendStatus(400);
      });
  },
};

export function create(req, res) {
  const processFn = submit[req.body.report_type];
  if (!processFn) {
    res.sendStatus(406);
  }
  processFn(req, res);
}
