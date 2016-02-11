'use strict';

const api = {
  get: (id) => id ? `/api/v1/vendor/${id}` : '/api/v1/vendor',
  create: '/api/v1/vendor',
  update: (id) => `/api/v1/vendor/${id}`,
  delete: (id) => `/api/v1/vendor/${id}`,
};

export {api};
