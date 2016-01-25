"use strict";

module.exports = {
    index: function *() {
        this.state.title = "user:index | " + this.state.name;

        let User = this.models.user;
        let items;

        yield function (done) {
            User.find().exec(function (err, model) {
                items = model;
                done(err);
            });
        };

        yield this.render('user/index', {
            items: items
        });
    },

    create: function *() {
        yield this.render('user/create');
    },

    doCreate: function *() {
        if (!this.request.body) {
            this.flash.danger = this.i18n.__('The body is empty');
            this.redirect('/user/create');
            return
        }

        if (!this.request.body.email) {
            this.flash.danger = this.i18n.__('Missing %s', 'email');
            this.redirect('/user/create');
            return
        }

        if (!this.request.body.password) {
            this.flash.danger = this.i18n.__('Missing %s', 'password');
            this.redirect('/user/create');
            return
        }

        let User = this.models.user;
        let ctx = this;

        yield function (done) {
            User.create(ctx.request.body).exec(function (err, model) {
                ctx.flash.success = ctx.i18n.__('The User is created');
                ctx.redirect('/user');
                done(err);
            });
        };
    },
};
