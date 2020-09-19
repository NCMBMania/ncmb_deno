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
// @ts-ignore TS2691
import NCMBObject from './object.ts';
var NCMBRequest = /** @class */ (function () {
    function NCMBRequest() {
    }
    NCMBRequest.prototype.get = function (className, queries) {
        if (queries === void 0) { queries = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.exec('GET', className, queries)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.results.map(function (o) {
                                var obj = new NCMBObject(className);
                                obj.sets(o);
                                return obj;
                            })];
                }
            });
        });
    };
    NCMBRequest.prototype.post = function (className, data) {
        if (data === void 0) { data = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.exec('POST', className, {}, data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NCMBRequest.prototype.put = function (className, data, objectId) {
        if (data === void 0) { data = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.exec('PUT', className, {}, data, objectId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NCMBRequest.prototype.data = function (params) {
        if (params === void 0) { params = {}; }
        var data = __assign({}, params);
        delete data.createDate;
        delete data.updateDate;
        delete data.objectId;
        for (var key in data) {
            var value = data[key];
            if (value instanceof Date) {
                data[key] = {
                    __type: 'Date',
                    iso: value.toISOString()
                };
            }
        }
        return JSON.stringify(data);
    };
    NCMBRequest.prototype.exec = function (method, className, queries, data, objectId) {
        if (queries === void 0) { queries = {}; }
        if (data === void 0) { data = {}; }
        if (objectId === void 0) { objectId = null; }
        return __awaiter(this, void 0, void 0, function () {
            var time, sig, headers, res, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        time = (new Date).toISOString();
                        sig = NCMBRequest.ncmb.signature.create(method, time, className, queries, objectId);
                        headers = {
                            'X-NCMB-Signature': sig,
                            'Content-Type': 'application/json'
                        };
                        headers[NCMBRequest.ncmb.applicationKeyName] = NCMBRequest.ncmb.applicationKey;
                        headers[NCMBRequest.ncmb.timestampName] = time;
                        if (NCMBRequest.ncmb.sessionToken) {
                            headers[NCMBRequest.ncmb.timestampName];
                        }
                        return [4 /*yield*/, NCMBRequest.ncmb.fetch(NCMBRequest.ncmb.url(className, queries, objectId), {
                                method: method,
                                headers: headers,
                                body: ['POST', 'PUT'].indexOf(method) > -1 ? this.data(data) : null
                            })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        json = _a.sent();
                        if (json.code)
                            throw new Error(json.error);
                        return [2 /*return*/, json];
                }
            });
        });
    };
    return NCMBRequest;
}());
export default NCMBRequest;
