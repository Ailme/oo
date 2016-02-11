'use strict';

const api = {
  get: (id) => id ? `/api/v1/zone/${id}` : '/api/v1/zone',
  create: '/api/v1/zone',
  update: (id) => `/api/v1/zone/${id}`,
  delete: (id) => `/api/v1/zone/${id}`,
};

export {api};
