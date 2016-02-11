'use strict';

const api = {
  get: (id) => id ? `/api/v1/service-category/${id}` : '/api/v1/service-category',
  create: '/api/v1/service-category',
  update: (id) => `/api/v1/service-category/${id}`,
  delete: (id) => `/api/v1/service-category/${id}`,
};

export {api};
