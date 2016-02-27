const thisFolderName = __dirname.split('/').pop();

import * as controller from './controller';

export const prefix = thisFolderName;
export const routes = {
  post: {
    '/': controller.create,
  },
  get: {
    '/': controller.read,
  },
  patch: {
    '/:id': controller.update,
  },
  delete: {
    '/:id': controller.destroy,
  },
};
