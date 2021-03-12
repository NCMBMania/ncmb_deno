"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var ncmb_ts_1 = require("../deno/ncmb.ts");
var read_json_ts_1 = require("https://deno.land/std@0.66.0/fs/read_json.ts");
var asserts_ts_1 = require("https://deno.land/std@0.65.0/testing/asserts.ts");
var config = await read_json_ts_1.readJson('./config.json');
var applicationKey = config.applicationKey;
var clientKey = config.clientKey;
new ncmb_ts_1["default"](applicationKey, clientKey);
Deno.test({
    name: "Save object",
    fn: function () { return __awaiter(void 0, void 0, void 0, function () {
        var hello;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    hello = new ncmb_ts_1.NCMBObject('Hello');
                    return [4 /*yield*/, hello
                            .set('message', 'Hello world')
                            .set('number', 100)
                            .save()];
                case 1:
                    _a.sent();
                    asserts_ts_1.assertEquals(hello.get('objectId') !== '', true);
                    return [2 /*return*/];
            }
        });
    }); }
});
Deno.test({
    name: "Update object",
    fn: function () { return __awaiter(void 0, void 0, void 0, function () {
        var hello, message, hello2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    hello = new ncmb_ts_1.NCMBObject('Hello');
                    return [4 /*yield*/, hello
                            .set('message', 'Hello world')
                            .set('number', 100)
                            .save()];
                case 1:
                    _a.sent();
                    asserts_ts_1.assertEquals(hello.get('objectId') !== '', true);
                    message = 'Update message';
                    return [4 /*yield*/, hello
                            .set('message', message)
                            .save()];
                case 2:
                    _a.sent();
                    hello2 = new ncmb_ts_1.NCMBObject('Hello');
                    hello2.set('objectId', hello.get('objectId'));
                    return [4 /*yield*/, hello2.fetch()];
                case 3:
                    _a.sent();
                    asserts_ts_1.assertEquals(hello.get('objectId'), hello2.get('objectId'));
                    asserts_ts_1.assertEquals(hello2.get('message'), message);
                    return [2 /*return*/];
            }
        });
    }); }
});
Deno.test({
    name: "Save with object",
    fn: function () { return __awaiter(void 0, void 0, void 0, function () {
        var hello, message, hello2, Hello, hello3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    hello = new ncmb_ts_1.NCMBObject('Hello');
                    message = 'Hello world';
                    return [4 /*yield*/, hello
                            .set('message', message)
                            .set('number', 100)
                            .save()];
                case 1:
                    _a.sent();
                    asserts_ts_1.assertEquals(hello.get('objectId') !== '', true);
                    hello2 = new ncmb_ts_1.NCMBObject('Hello');
                    return [4 /*yield*/, hello2
                            .set('message', 'Relative object')
                            .set('hello', hello)
                            .set('number', 100)
                            .save()];
                case 2:
                    _a.sent();
                    asserts_ts_1.assertEquals(hello2.get('objectId') !== '', true);
                    Hello = new ncmb_ts_1.NCMBQuery('Hello');
                    return [4 /*yield*/, Hello
                            .include('hello')
                            .equalTo('objectId', hello2.get('objectId'))
                            .fetch()];
                case 3:
                    hello3 = _a.sent();
                    if (hello3) {
                        asserts_ts_1.assertEquals(hello3.get('hello').get('message'), message);
                    }
                    else {
                        asserts_ts_1.assertEquals(true, false);
                    }
                    return [2 /*return*/];
            }
        });
    }); }
});
Deno.test({
    name: "Increment object",
    fn: function () { return __awaiter(void 0, void 0, void 0, function () {
        var hello, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    hello = new ncmb_ts_1.NCMBObject('Hello');
                    message = 'Hello world';
                    return [4 /*yield*/, hello
                            .set('message', message)
                            .set('number', 100)
                            .save()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, hello
                            .setIncrement('number', 2)
                            .save()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, hello.fetch()];
                case 3:
                    _a.sent();
                    asserts_ts_1.assertEquals(hello.get('number'), 102);
                    return [2 /*return*/];
            }
        });
    }); }
});
Deno.test({
    name: "Save with Acl",
    fn: function () { return __awaiter(void 0, void 0, void 0, function () {
        var hello, acl, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    hello = new ncmb_ts_1.NCMBObject('Hello');
                    acl = new ncmb_ts_1.NCMBAcl;
                    acl
                        .setRoleReadAccess('Admin', true)
                        .setRoleWriteAccess('Admin', true);
                    message = 'Hello world';
                    return [4 /*yield*/, hello
                            .set('message', message)
                            .set('number', 100)
                            .set('acl', acl)
                            .save()];
                case 1:
                    _a.sent();
                    try {
                        hello.fetch();
                        asserts_ts_1.assertEquals(true, false);
                    }
                    catch (e) {
                    }
                    return [4 /*yield*/, ncmb_ts_1.NCMBUser.login('admin', 'admin')];
                case 2:
                    _a.sent();
                    hello.fetch();
                    asserts_ts_1.assertEquals(hello.get('number'), 100);
                    return [4 /*yield*/, hello["delete"]()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, ncmb_ts_1.NCMBUser.logout()];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }
});
Deno.test({
    name: "Save with GeoPoint",
    fn: function () { return __awaiter(void 0, void 0, void 0, function () {
        var hello, lat, geo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    hello = new ncmb_ts_1.NCMBObject('Hello');
                    lat = 35.6585805;
                    geo = new ncmb_ts_1.NCMBGeoPoint(lat, 139.7454329);
                    hello
                        .set('geo', geo)
                        .save();
                    return [4 /*yield*/, hello.fetch()];
                case 1:
                    _a.sent();
                    asserts_ts_1.assertEquals(hello.get('geo') instanceof ncmb_ts_1.NCMBGeoPoint, true);
                    asserts_ts_1.assertEquals(hello.get('geo').latitude, lat);
                    return [2 /*return*/];
            }
        });
    }); }
});
Deno.test({
    name: "Delete all data",
    fn: function () { return __awaiter(void 0, void 0, void 0, function () {
        var p, Hello, ary;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    p = [];
                    Hello = new ncmb_ts_1.NCMBQuery('Hello');
                    return [4 /*yield*/, Hello
                            .limit(1000)
                            .fetchAll()];
                case 1:
                    ary = _a.sent();
                    ary.forEach(function (o) { return p.push(o["delete"]()); });
                    return [4 /*yield*/, Promise.all(p)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }
});
