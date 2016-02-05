'use strict';
var User = (function () {
    function User(options) {
        this.setOptions(options);
    }
    /**
     * @param options
     */
    User.prototype.setOptions = function (options) {
        for (var key in options) {
            this[key] = options[key];
        }
    };
    /**
     * @returns {boolean}
     */
    User.prototype.isGuest = function () {
        return !!!this.id;
    };
    return User;
})();
exports["default"] = User;
//# sourceMappingURL=user-model.js.map