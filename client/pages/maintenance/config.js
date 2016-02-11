'use strict';

const api = {
  get: (id) => id ? `/api/v1/maintenance/${id}` : '/api/v1/maintenance',
  create: '/api/v1/maintenance',
  update: (id) => `/api/v1/maintenance/${id}`,
  delete: (id) => `/api/v1/maintenance/${id}`,
};

export {api};
