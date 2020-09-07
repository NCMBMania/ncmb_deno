"use strict";
exports.__esModule = true;
var NCMBSignature = /** @class */ (function () {
    function NCMBSignature(ncmb) {
        this._ncmb = ncmb;
        this._signatureMethodName = 'SignatureMethod';
        this._signatureMethodValue = 'HmacSHA256';
        this._signatureVersionName = 'SignatureVersion';
        this._signatureVersionValue = '2';
    }
    NCMBSignature.prototype.create = function (method, time, className, queries, objectId) {
        if (queries === void 0) { queries = {}; }
        if (objectId === void 0) { objectId = null; }
        var path = this._ncmb.path(className, objectId);
        queries[this._signatureMethodName] = this._signatureMethodValue;
        queries[this._signatureVersionName] = this._signatureVersionValue;
        queries[this._ncmb.applicationKeyName] = this._ncmb.applicationKey;
        queries[this._ncmb.timestampName] = time;
        var query = Object.keys(queries).sort().map(function (k) { return k + "=" + encodeURI(JSON.stringify(queries[k])); }).join('&');
        var string = [method, this._ncmb.fqdn, path, query].join("\n");
        return this._ncmb.sign(string);
    };
    return NCMBSignature;
}());
exports["default"] = NCMBSignature;
