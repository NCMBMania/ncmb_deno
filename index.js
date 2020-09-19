import NCMBObject from './libs/object';
import NCMBSignature from './libs/signature';
import NCMBRequest from './libs/request';
import NCMBQuery from './libs/query';
import NCMBInstallation from './libs/installation';
import NCMBUser from './libs/user';
import NCMBAcl from './libs/acl';
import NCMBGeoPoint from './libs/geopoint';
import * as crypto from 'crypto';
import fetch from 'node-fetch';
export { NCMBObject, NCMBQuery, NCMBInstallation, NCMBUser, NCMBAcl, NCMBGeoPoint };
var NCMB = /** @class */ (function () {
    function NCMB(applicationKey, clientKey) {
        this.sessionToken = null;
        this.applicationKey = applicationKey;
        this.clientKey = clientKey;
        this.fqdn = 'mbaas.api.nifcloud.com';
        this.version = '2013-09-01';
        this.applicationKeyName = 'X-NCMB-Application-Key';
        this.timestampName = 'X-NCMB-Timestamp';
        this.signature = new NCMBSignature;
        this.request = new NCMBRequest;
        this.initObject();
    }
    NCMB.prototype.initObject = function () {
        NCMBQuery.ncmb = this;
        NCMBRequest.ncmb = this;
        NCMBSignature.ncmb = this;
        NCMBObject.ncmb = this;
        NCMBInstallation.ncmb = this;
        NCMBUser.ncmb = this;
    };
    NCMB.prototype.path = function (className, objectId) {
        if (className.indexOf('/') === 0) {
            return "/" + this.version + className + "/" + (objectId || '');
        }
        if (['installations', 'users', 'files', 'push'].indexOf(className) > -1) {
            return "/" + this.version + "/" + className + "/" + (objectId || '');
        }
        return "/" + this.version + "/classes/" + className + "/" + (objectId || '');
    };
    NCMB.prototype.url = function (className, queries, objectId) {
        if (queries === void 0) { queries = {}; }
        var query = Object.keys(queries).sort().map(function (k) {
            var val = typeof queries[k] === 'object' ? JSON.stringify(queries[k]) : queries[k];
            return k + "=" + encodeURI(val);
        }).join('&');
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
        return fetch(url, options);
    };
    return NCMB;
}());
export { NCMB };
