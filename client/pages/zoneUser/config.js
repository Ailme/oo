'use strict';

const api = {
  get: (id) => id ? `/api/v1/zone-user/${id}` : '/api/v1/zone-user',
  create: '/api/v1/zone-user',
  update: (id) => `/api/v1/zone-user/${id}`,
  delete: (id) => `/api/v1/zone-user/${id}`,
};

export {api};
