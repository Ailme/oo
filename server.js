"use strict";

const path = require("path");
const app = require("koa")();
const config = require('./config/main');
const assets = require(config.path.assets + "/assets.json");

app.name = config.name;
app.keys = config.keys;
app.env = config.env;

app.use(function *(next) {
    this.state.assets = assets;

    this.state.xhr = (this.request.get('X-Requested-With') === 'XMLHttpRequest');
    yield next;
});

require('koa-locale')(app);
app.use(require('koa-bodyparser')(config.bodyparser));
app.use(require('koa-i18n')(app, config.i18n));
app.use(require('koa-favicon')(config.path.public + '/favicon.ico'));
app.use(require('koa-static')(config.static.directory, config.static));
app.use(require('koa-generic-session')(config.session));
app.use(require('koa-flash')(config.flash));

let passport = require('./config/auth')(app, config.auth);
app.use(passport.initialize());
app.use(passport.session());

app.use(require('koa-swig-render')(config.templates));
app.use(require('koa-error')(config.error));
app.use(require('koa-logger')());
app.use(require('koa-compress')());
app.use(require('koa-response-time')());

require('./config/routes')(app, passport);
require('./config/database')(app, config, function (err, ontology) {
    if (err) {
        throw err
    }

    app.context.models = ontology.collections;

    console.log('database adapter initialized');
});

if (!module.parent) {
    console.log('Server running on ' + config.env);
    app.listen(config.port || 3000, function () {
        console.log('Server running on port ' + config.port || 3000)
    })
} else {
    module.exports = app
}
