const thisFolderName = __dirname.split('/').pop();

import * as controller from './controller';

export const prefix = thisFolderName;
export const routes = {
  get: {
    '/:id/precincts': controller.precincts,
  },
};
