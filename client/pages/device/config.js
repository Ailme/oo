'use strict';

const api = {
  get: (id) => id ? `/api/v1/device/${id}` : '/api/v1/device',
  create: '/api/v1/device',
  update: (id) => `/api/v1/device/${id}`,
  delete: (id) => `/api/v1/device/${id}`,
};

export {api};
