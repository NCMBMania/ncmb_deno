"use strict";
exports.__esModule = true;
var object_1 = require("./libs/object");
var signature_1 = require("./libs/signature");
var request_1 = require("./libs/request");
var query_1 = require("./libs/query");
var crypto = require("crypto");
var node_fetch_1 = require("node-fetch");
var NCMB = /** @class */ (function () {
    function NCMB(applicationKey, clientKey) {
        this.applicationKey = applicationKey;
        this.clientKey = clientKey;
        this.fqdn = 'mbaas.api.nifcloud.com';
        this.version = '2013-09-01';
        this.initObjects();
        this.applicationKeyName = 'X-NCMB-Application-Key';
        this.timestampName = 'X-NCMB-Timestamp';
    }
    NCMB.prototype.initObjects = function () {
        this.signature = new signature_1["default"](this);
        this.request = new request_1["default"](this);
    };
    NCMB.prototype.Object = function (name) {
        return new object_1["default"](this, name);
    };
    NCMB.prototype.Query = function (name) {
        return new query_1["default"](this, name);
    };
    NCMB.prototype.path = function (className, objectId) {
        return "/" + this.version + "/classes/" + className + "/" + (objectId || '');
    };
    NCMB.prototype.url = function (className, queries, objectId) {
        if (queries === void 0) { queries = {}; }
        var query = Object.keys(queries).sort().map(function (k) { return k + "=" + encodeURI(JSON.stringify(queries[k])); }).join('&');
        return "https://" + this.fqdn + this.path(className, objectId) + (query ? '?' + query : '');
    };
    NCMB.prototype.base64 = function (buffer) {
        var bytes = new Uint8Array(buffer);
        var len = bytes.length;
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var ary = [];
        for (var i = 0; i < len; i += 3) {
            ary.push(chars[bytes[i] >> 2]);
            ary.push(chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)]);
            ary.push(chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)]);
            ary.push(chars[bytes[i + 2] & 63]);
        }
        var str = ary.join('');
        var result = '';
        if ((len % 3) === 2) {
            result = str.substring(0, str.length - 1) + "=";
        }
        else if (len % 3 === 1) {
            result = str.substring(0, str.length - 2) + "==";
        }
        return result;
    };
    NCMB.prototype.sign = function (str) {
        var hmac = crypto.createHmac('sha256', this.clientKey);
        return this.base64(hmac.update(str).digest());
    };
    NCMB.prototype.fetch = function (url, options) {
        return node_fetch_1["default"](url, options);
    };
    return NCMB;
}());
exports["default"] = NCMB;