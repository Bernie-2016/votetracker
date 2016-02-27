require('babel-register')({
  presets: ['es2015'],
});
require('dotenv').config();

const path = require('path');
const config = require('./src/server/config').default;

module.exports = {
  client: {
    name: 'postgresql',
    config: config.db,
  },
  files: {
    directory: path.join(__dirname, 'migrations'),
  },
};
