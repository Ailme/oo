'use strict';

const path = {
  create: "/create",
  update: "/update/:id",
  home: "/:date"
};

const url = {
  create: "/create",
  update: (id) => `/update/${id}`,
  home: "/"
};

const api = {
  get: (id) => id ? `/user/${id}` : '/user',
  create: '/user',
  update: (id) => `/user/${id}`,
  delete: (id) => `/user/${id}`,
  updateStatus: (id) => `/user/updateStatus/${id}`,
};

export {path, url, api};
