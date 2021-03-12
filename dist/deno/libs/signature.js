"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var NCMBSignature = /** @class */ (function () {
    function NCMBSignature() {
        this._signatureMethodName = "SignatureMethod";
        this._signatureMethodValue = "HmacSHA256";
        this._signatureVersionName = "SignatureVersion";
        this._signatureVersionValue = "2";
    }
    NCMBSignature.prototype.create = function (method, time, className, q, objectId) {
        if (q === void 0) { q = {}; }
        if (objectId === void 0) { objectId = null; }
        var queries = __assign({}, q);
        var ncmb = NCMBSignature.ncmb;
        var path = ncmb.path(className, objectId);
        queries[this._signatureMethodName] = this._signatureMethodValue;
        queries[this._signatureVersionName] = this._signatureVersionValue;
        queries[ncmb.applicationKeyName] = ncmb.applicationKey;
        queries[ncmb.timestampName] = time;
        var query = Object.keys(queries).sort().map(function (k) {
            var val = typeof queries[k] === "object" ? JSON.stringify(queries[k]) : queries[k];
            return k + "=" + encodeURI(val);
        }).join("&");
        var string = [method, ncmb.fqdn, path, query].join("\n");
        return ncmb.sign(string);
    };
    return NCMBSignature;
}());
exports["default"] = NCMBSignature;
