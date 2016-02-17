'use strict';

const api = {
  get: (id) => id ? `/api/v1/area/${id}` : '/api/v1/area',
  create: '/api/v1/area',
  import: '/api/v1/area/import',
  update: (id) => `/api/v1/area/${id}`,
  delete: (id) => `/api/v1/area/${id}`,
};

export {api};
