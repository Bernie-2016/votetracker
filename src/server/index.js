require('babel-register')({
  presets: ['es2015'],
});
require('dotenv').config();
require('./services/webserver').default.listen(process.env.API_PORT);
