'use strict';

import User from '../user-model.ts';

let _user = new User({});
let _changeListeners = [];
let _initCalled = false;

const URL = {
  login: '/login',
  logout: '/logout',
  checkUser: '/getCurrentUser',
};

const AuthStore = {
  init: function () {
    if (_initCalled) {
      return;
    }
    _initCalled = true;
    this.fetchUser();
  },
  fetchUser: function () {
    fetch(URL.checkUser, {
        method: 'post',
        credentials: 'include',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }
    )
      .then(response => {
        return response.json();
      }).then((json => {
        if (json) {
          _user = new User(json);
        } else {
          _user = new User({});
        }
        AuthStore.notifyChange();
      }))
      .catch((err => {
        console.log(err);
      }));
  },
  login: function (username, password, done) {
    fetch(URL.login, {
        method: 'post',
        credentials: 'include',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password,
        })
      }
    )
      .then(response => {
        return response.json();
      }).then((json => {
        if (json.error) {
          done(json.error, _user);
        } else {
          _user = new User(json);
          done(null, _user);
        }

        AuthStore.notifyChange();
      }))
      .catch((err => {
        console.log(err);
        done(err, _user);
      }));
  },
  logout: function (done) {
    _user = new User({});

    fetch(URL.logout, {
        method: 'post',
        credentials: 'include',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }
    )
      .then(response => {
        return response.json();
      }).then((json => {
        done(null, _user);
        AuthStore.notifyChange();
      }))
      .catch((err => {
        console.log(err);
        done(err, _user);
      }));
  },
  getUser: function () {
    return _user;
  },
  notifyChange: function () {
    _changeListeners.forEach(function (listener) {
      listener();
    });
  },
  addChangeListener: function (listener) {
    _changeListeners.push(listener);
  },
  removeChangeListener: function (listener) {
    _changeListeners = _changeListeners.filter(function (l) {
      return listener !== l;
    });
  },
};

export default AuthStore;
