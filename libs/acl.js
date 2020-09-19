"use strict";
exports.__esModule = true;
var NCMBAcl = /** @class */ (function () {
    function NCMBAcl() {
        this._fields = {
            '*': {
                read: true,
                write: true
            }
        };
    }
    NCMBAcl.prototype.setPublicReadAccess = function (bol) {
        this._fields['*'].read = bol;
        return this;
    };
    NCMBAcl.prototype.setPublicWriteAccess = function (bol) {
        this._fields['*'].write = bol;
        return this;
    };
    NCMBAcl.prototype.setUserReadAccess = function (user, bol) {
        this._fields[user.get('objectId')].read = bol;
        return this;
    };
    NCMBAcl.prototype.setUserWriteAccess = function (user, bol) {
        this._fields[user.get('objectId')].write = bol;
        return this;
    };
    NCMBAcl.prototype.setRoleReadAccess = function (role, bol) {
        this._fields["role:" + role].read = bol;
        return this;
    };
    NCMBAcl.prototype.setRoleWriteAccess = function (role, bol) {
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
                params[key].read = true;
            }
        }
        return params;
    };
    return NCMBAcl;
}());
exports["default"] = NCMBAcl;
