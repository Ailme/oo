'use strict';

const api = {
  get: (id) => id ? `/api/v1/model/${id}` : '/api/v1/model',
  create: '/api/v1/model',
  update: (id) => `/api/v1/model/${id}`,
  delete: (id) => `/api/v1/model/${id}`,
};

export {api};
