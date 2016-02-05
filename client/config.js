'use strict';

const routePath = {
  login: '/login',
  user: "/user",
  createUser: "/user/create",
  updateUser: "/user/update/:id",

  tag: "/tag",
  category: "/category",
  wallet: "/wallet",

  home: "/:date"
};

const routeUrl = {
  createUser: "/user/create",
  updateUser: (id) => `/user/update/${id}`,
  home: "/"
};

const api = {
  getUser: (id) => id ? `/user/${id}` : '/user',
  createUser: '/user',
  updateUser: (id) => `/user/${id}`,
  deleteUser: (id) => `/user/${id}`,
  updateStatusUser: (id) => `/user/updateStatus/${id}`,

  login: '/login',
  checkUser: '/getCurrentUser',

  getTag: () => '/tag',
  getCategory: () => '/category',
  getWallet: () => '/wallet',
  getType: () => '/type',
  getOperation: (date) => date ? `/operation/${date}` : '/operation',
};

export {routePath, routeUrl, api};
