'use strict';

const api = {
  get: (id) => id ? `/api/v1/type/${id}` : '/api/v1/type',
  create: '/api/v1/type',
  update: (id) => `/api/v1/type/${id}`,
  delete: (id) => `/api/v1/type/${id}`,
};

export {api};
