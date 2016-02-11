'use strict';

const api = {
  get: (id) => id ? `/api/v1/placing/${id}` : '/api/v1/placing',
  create: '/api/v1/placing',
  update: (id) => `/api/v1/placing/${id}`,
  delete: (id) => `/api/v1/placing/${id}`,
};

export {api};
