'use strict';

const api = {
  get: (id) => id ? `/api/v1/service-type/${id}` : '/api/v1/service-type',
  create: '/api/v1/service-type',
  update: (id) => `/api/v1/service-type/${id}`,
  delete: (id) => `/api/v1/service-type/${id}`,
};

export {api};
