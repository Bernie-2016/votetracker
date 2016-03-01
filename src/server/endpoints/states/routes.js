const thisFolderName = __dirname.split('/').pop();

import * as controller from './controller';

export const prefix = thisFolderName;
export const routes = {
  get: {
    '/': controller.read,
    '/:state/counties': controller.counties,
    '/:state/:county/precincts': controller.precincts,
    '/:state/:county/locations': controller.locations,
  },
};
