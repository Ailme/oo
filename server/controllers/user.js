"use strict";

module.exports = {
    index: function *() {
        this.state.title = "user:index | " + this.state.name;

        let User = this.models.user;

        //console.log(this.models);

        User.find({id: 1}).exec(function (err, model) {
            console.log(err);
            console.log(model);

            //    //return model.toJSON(); // Will return only the name
        });

        yield this.render('user/index');
    },
    create: function *() {
        yield this.render('user/create');
    },
    doCreate: function *() {
        if (!this.request.body) {
            this.flash.danger = 'The body is empty';
            this.redirect('/user/create')
        }

        if (!this.request.body.username) {
            this.throw("Missing username", 400);
        }

        if (!this.request.body.password) {
            this.throw("Missing password", 400);
        }

        let User = this.models.user;

        console.log(this.request.body);

        let user = new User({email: this.request.body.username, password: this.request.body.password});
        user = yield user.save();

        this.flash.success = 'The User is created';

        this.redirect('/user')
    },
};
