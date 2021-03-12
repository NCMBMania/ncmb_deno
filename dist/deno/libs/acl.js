"use strict";
exports.__esModule = true;
var NCMBAcl = /** @class */ (function () {
    function NCMBAcl() {
        this._fields = {
            "*": {
                read: true,
                write: true
            }
        };
    }
    NCMBAcl.prototype.sets = function (params) {
        for (var key in params) {
            var value = params[key];
            if (key === "*") {
                if (value.read)
                    this.setPublicReadAccess(true);
                if (value.write)
                    this.setPublicWriteAccess(true);
            }
            else if (key.match(/^role:/)) {
                var role = key.split(":")[1];
                if (value.read)
                    this.setRoleReadAccess(role, true);
                if (value.write)
                    this.setRoleWriteAccess(role, true);
            }
            else {
                if (value.read)
                    this.setUserReadAccess(key, true);
                if (value.write)
                    this.setUserWriteAccess(key, true);
            }
        }
        return this;
    };
    NCMBAcl.prototype.setPublicReadAccess = function (bol) {
        this._fields["*"].read = bol;
        return this;
    };
    NCMBAcl.prototype.setPublicWriteAccess = function (bol) {
        this._fields["*"].write = bol;
        return this;
    };
    NCMBAcl.prototype.initWhere = function (key) {
        if (!this._fields[key]) {
            this._fields[key] = {
                read: false,
                write: false
            };
        }
    };
    NCMBAcl.prototype.setUserReadAccess = function (user, bol) {
        this.initWhere(user.get("objectId"));
        this._fields[user.get("objectId")].read = bol;
        return this;
    };
    NCMBAcl.prototype.setUserWriteAccess = function (user, bol) {
        this.initWhere(user.get("objectId"));
        this._fields[user.get("objectId")].write = bol;
        return this;
    };
    NCMBAcl.prototype.setRoleReadAccess = function (role, bol) {
        this.initWhere("role:" + role);
        this._fields["role:" + role].read = bol;
        return this;
    };
    NCMBAcl.prototype.setRoleWriteAccess = function (role, bol) {
        this.initWhere("role:" + role);
        this._fields["role:" + role].write = bol;
        return this;
    };
    NCMBAcl.prototype.toJSON = function () {
        var params = {};
        for (var key in this._fields) {
            var p = this._fields[key];
            if (p.read || p.write) {
                params[key] = {};
            }
            if (this._fields[key].read) {
                params[key].read = true;
            }
            if (this._fields[key].write) {
                params[key].write = true;
            }
        }
        return params;
    };
    return NCMBAcl;
}());
exports["default"] = NCMBAcl;
