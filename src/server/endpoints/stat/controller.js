import db from '../../services/db';

export function create(req, res) {
  res.send('create');
}

export function read(req, res) {
  db.query('SELECT * FROM pg_stat_activity', true).then(result => {
    res.send(result);
  });
}

export function update(req, res) {
  res.send('update');
}

export function destroy(req, res) {
  res.send('destroy');
}
