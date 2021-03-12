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
var index_1 = require("../index");
var NCMBObject = /** @class */ (function () {
    function NCMBObject(name) {
        this._name = name;
        this._fields = {};
        this._required = [];
    }
    NCMBObject.prototype.sets = function (obj) {
        for (var key in obj) {
            if (['className', '__type'].indexOf(key) > -1)
                continue;
            this.set(key, obj[key]);
        }
        return this;
    };
    NCMBObject.prototype.set = function (key, value) {
        if (['createDate', 'updateDate'].indexOf(key) > -1) {
            this._fields[key] = new Date(value);
        }
        else if (value && value.__type === 'Date' && value.iso) {
            this._fields[key] = new Date(value.iso);
        }
        else if (value && value.__type === 'Object') {
            var o = new NCMBObject(value.className);
            o.sets(value);
            this._fields[key] = o;
        }
        else if (key === 'acl') {
            var a = new index_1.NCMBAcl();
            a.sets(value);
            this._fields[key] = a;
        }
        else {
            this._fields[key] = value;
        }
        return this;
    };
    NCMBObject.prototype.get = function (k) {
        return this._fields[k];
    };
    NCMBObject.prototype.add = function (k, value) {
        return this.addOrRemove(k, value, 'Add');
    };
    NCMBObject.prototype.addUnique = function (k, value) {
        return this.addOrRemove(k, value, 'AddUnique');
    };
    NCMBObject.prototype.remove = function (k, value) {
        return this.addOrRemove(k, value, 'Remove');
    };
    NCMBObject.prototype.addOrRemove = function (k, objects, __op) {
        if (!Array.isArray(objects)) {
            objects = [objects];
        }
        if (this._fields['objectId']) {
            if (this._fields[k] && this._fields[k].objects) {
                for (var _i = 0, objects_1 = objects; _i < objects_1.length; _i++) {
                    var obj = objects_1[_i];
                    this._fields[k].objects.push(obj);
                }
            }
            else {
                this._fields[k] = { __op: __op, objects: objects };
            }
        }
        else {
            this._fields[k] = objects;
        }
        return this;
    };
    NCMBObject.prototype.setIncrement = function (name, value) {
        if (!this.get('objectId')) {
            return this.set(name, value);
        }
        return this.set(name, {
            __op: 'Increment',
            amount: value
        });
    };
    NCMBObject.prototype.getJson = function () {
        return __assign(__assign({}, this._fields), { sessionToken: NCMBObject.ncmb.sessionToken });
    };
    NCMBObject.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, key, value, method, json;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        for (_i = 0, _a = this._required; _i < _a.length; _i++) {
                            key = _a[_i];
                            value = this.get(key);
                            if (!value || value === '') {
                                throw new Error(key + " is required.");
                            }
                        }
                        method = this._fields.objectId ? 'put' : 'post';
                        return [4 /*yield*/, NCMBObject.ncmb.request[method](this._name, this._fields, this._fields.objectId)];
                    case 1:
                        json = _b.sent();
                        this.sets(json);
                        return [2 /*return*/, this];
                }
            });
        });
    };
    NCMBObject.prototype.fetch = function (ncmb) {
        return __awaiter(this, void 0, void 0, function () {
            var json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (ncmb || NCMBObject.ncmb).request.exec('GET', this._name, {}, {}, this._fields.objectId)];
                    case 1:
                        json = _a.sent();
                        this.sets(json);
                        return [2 /*return*/, this];
                }
            });
        });
    };
    NCMBObject.prototype["delete"] = function (ncmb) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (ncmb || NCMBObject.ncmb).request["delete"](this._name, this._fields.objectId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NCMBObject.prototype.toJSON = function () {
        if (!this.get('objectId')) {
            throw new Error('Save object data before add themselve as Pointer.');
        }
        return {
            __type: 'Pointer',
            objectId: this.get('objectId'),
            className: this._name
        };
    };
    return NCMBObject;
}());
exports["default"] = NCMBObject;
