"use strict";
exports.__esModule = true;
exports.NCMBPush = exports.NCMBGeoPoint = exports.NCMBAcl = exports.NCMBUser = exports.NCMBInstallation = exports.NCMBQuery = exports.NCMBObject = void 0;
var object_ts_1 = require("./libs/object.ts");
exports.NCMBObject = object_ts_1["default"];
var signature_ts_1 = require("./libs/signature.ts");
var request_ts_1 = require("./libs/request.ts");
var query_ts_1 = require("./libs/query.ts");
exports.NCMBQuery = query_ts_1["default"];
var installation_ts_1 = require("./libs/installation.ts");
exports.NCMBInstallation = installation_ts_1["default"];
var user_ts_1 = require("./libs/user.ts");
exports.NCMBUser = user_ts_1["default"];
var acl_ts_1 = require("./libs/acl.ts");
exports.NCMBAcl = acl_ts_1["default"];
var geopoint_ts_1 = require("./libs/geopoint.ts");
exports.NCMBGeoPoint = geopoint_ts_1["default"];
var push_ts_1 = require("./libs/push.ts");
exports.NCMBPush = push_ts_1["default"];
var crypto = require("crypto");
var node_fetch_1 = require("node-fetch");
var uuid_1 = require("uuid");
var NCMB = /** @class */ (function () {
    function NCMB(applicationKey, clientKey) {
        this.sessionToken = null;
        this.applicationKey = applicationKey;
        this.clientKey = clientKey;
        this.fqdn = "mbaas.api.nifcloud.com";
        this.version = "2013-09-01";
        this.applicationKeyName = "X-NCMB-Application-Key";
        this.timestampName = "X-NCMB-Timestamp";
        this.sessionTokenHeader = "X-NCMB-Apps-Session-Token";
        this.signature = new signature_ts_1["default"];
        this.request = new request_ts_1["default"];
        this.initObject();
    }
    NCMB.prototype.initObject = function () {
        query_ts_1["default"].ncmb = this;
        request_ts_1["default"].ncmb = this;
        signature_ts_1["default"].ncmb = this;
        object_ts_1["default"].ncmb = this;
        installation_ts_1["default"].ncmb = this;
        user_ts_1["default"].ncmb = this;
        push_ts_1["default"].ncmb = this;
    };
    NCMB.prototype.path = function (className, objectId) {
        if (className.indexOf("/") === 0) {
            return "/" + this.version + className + "/" + (objectId || "");
        }
        if (["installations", "users", "files", "push"].indexOf(className) > -1) {
            return "/" + this.version + "/" + className + "/" + (objectId || "");
        }
        return "/" + this.version + "/classes/" + className + "/" + (objectId || "");
    };
    NCMB.prototype.url = function (className, queries, objectId) {
        if (queries === void 0) { queries = {}; }
        var query = Object.keys(queries).sort().map(function (k) {
            var val = typeof queries[k] === "object" ? JSON.stringify(queries[k]) : queries[k];
            return k + "=" + encodeURI(val);
        }).join("&");
        return "https://" + this.fqdn + this.path(className, objectId) + (query ? "?" + query : "");
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
        var str = ary.join("");
        var result = "";
        if ((len % 3) === 2) {
            result = str.substring(0, str.length - 1) + "=";
        }
        else if (len % 3 === 1) {
            result = str.substring(0, str.length - 2) + "==";
        }
        return result;
    };
    NCMB.prototype.sign = function (str) {
        var hmac = crypto.createHmac("sha256", this.clientKey);
        return this.base64(hmac.update(str).digest());
    };
    NCMB.prototype.uuid = function () {
        return uuid_1.v4();
    };
    NCMB.prototype.fetch = function (url, options) {
        if (typeof window !== "undefined") {
            return node_fetch_1["default"].bind(window)(url, options);
        }
        return node_fetch_1["default"](url, options);
    };
    return NCMB;
}());
exports["default"] = NCMB;
