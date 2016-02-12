'use strict';

const api = {
  get: (id) => id ? `/api/v1/region/${id}` : '/api/v1/region',
  create: '/api/v1/region',
  import: '/api/v1/region/import',
  update: (id) => `/api/v1/region/${id}`,
  delete: (id) => `/api/v1/region/${id}`,
};

export {api};
