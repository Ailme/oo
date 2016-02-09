'use strict';

const api = {
  get: (id) => id ? `/api/v1/user/${id}` : '/api/v1/user',
  create: '/api/v1/user',
  update: (id) => `/api/v1/user/${id}`,
  delete: (id) => `/api/v1/user/${id}`,
  updateStatus: (id) => `/api/v1/user/updateStatus/${id}`,
};

export {api};
