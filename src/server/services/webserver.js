import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import routeBuilder from 'express-routebuilder';

import * as statRoutes from '../endpoints/stat/routes';
import * as statesRoutes from '../endpoints/states/routes';
import * as reportRoutes from '../endpoints/report/routes';
import * as locationsRoutes from '../endpoints/locations/routes';

const endpoints = [statRoutes, statesRoutes, reportRoutes, locationsRoutes];
const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(morgan('combined'));

endpoints.forEach(endpoint => {
  server.use(routeBuilder(
    express.Router(), // eslint-disable-line
    endpoint.routes,
    `/${endpoint.prefix}`
  ));
});

server.get('/', (req, res) => {
  res.send({ version: 'v1' });
});

server.use((req, res) => {
  res.status('404').send('Route not found.');
});

export default server;
