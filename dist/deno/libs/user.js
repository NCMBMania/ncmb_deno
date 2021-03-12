"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
// @ts-ignore TS2691
var index_ts_1 = require("../index.ts");
var NCMBUser = /** @class */ (function (_super) {
    __extends(NCMBUser, _super);
    function NCMBUser() {
        var _this = _super.call(this, "users") || this;
        _this._name = "users";
        _this._fields = {};
        return _this;
    }
    NCMBUser.query = function () {
        return new index_ts_1.NCMBQuery("users");
    };
    NCMBUser.prototype.set = function (key, value) {
        return _super.prototype.set.call(this, key, value);
    };
    NCMBUser.prototype.sets = function (obj) {
        return _super.prototype.sets.call(this, obj);
    };
    NCMBUser.prototype["delete"] = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, _super.prototype["delete"].call(this, NCMBUser.ncmb)];
            });
        });
    };
    NCMBUser.prototype.get = function (k) {
        return _super.prototype.get.call(this, k);
    };
    NCMBUser.prototype.fetch = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, _super.prototype.fetch.call(this, NCMBUser.ncmb)];
            });
        });
    };
    NCMBUser.key = function () {
        return "NCMB/" + NCMBUser.ncmb.applicationKey + "/currentUser";
    };
    NCMBUser.prototype.getJson = function () {
        return __assign(__assign({}, this._fields), { sessionToken: NCMBUser.ncmb.sessionToken });
    };
    NCMBUser.signUp = function (userName, password) {
        return __awaiter(this, void 0, void 0, function () {
            var json, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, NCMBUser.ncmb.request.exec("POST", "/users", {}, { userName: userName, password: password })];
                    case 1:
                        json = _a.sent();
                        user = new NCMBUser();
                        NCMBUser.ncmb.sessionToken = json.sessionToken;
                        delete json.sessionToken;
                        user.sets(json);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    NCMBUser.prototype.signUpByAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, NCMBUser.ncmb.request.exec("GET", "/login", this._fields)];
                    case 1:
                        json = _a.sent();
                        NCMBUser.ncmb.sessionToken = json.sessionToken;
                        delete json.sessionToken;
                        this.sets(json);
                        return [2 /*return*/, true];
                }
            });
        });
    };
    NCMBUser.prototype.signUpWith = function (provider, auth) {
        return __awaiter(this, void 0, void 0, function () {
            var expireDate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expireDate = new Date(auth.expires + (new Date()).getTime()).toJSON();
                        auth.expiration_date = {
                            __type: "Date",
                            iso: expireDate
                        };
                        delete auth.expires;
                        this._fields = { authData: {} };
                        this._fields.authData[provider] = auth;
                        return [4 /*yield*/, this.signUpByAccount()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NCMBUser.requestSignUpEmail = function (mailAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var json, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, NCMBUser.ncmb.request.exec("POST", "/requestMailAddressUserEntry", {}, { mailAddress: mailAddress })];
                    case 1:
                        json = _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NCMBUser.requestPasswordReset = function (mailAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var json, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, NCMBUser.ncmb.request.exec("POST", "/requestPasswordReset", {}, { mailAddress: mailAddress })];
                    case 1:
                        json = _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NCMBUser.login = function (userName, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.loginWith({ userName: userName, password: password })];
            });
        });
    };
    NCMBUser.loginWithEmail = function (mailAddress, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.loginWith({ mailAddress: mailAddress, password: password })];
            });
        });
    };
    NCMBUser.loginWith = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var json, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, NCMBUser.ncmb.request.exec("GET", "/login", params)];
                    case 1:
                        json = _a.sent();
                        user = new NCMBUser();
                        NCMBUser.ncmb.sessionToken = json.sessionToken;
                        delete json.sessionToken;
                        user.sets(json);
                        return [2 /*return*/, user];
                }
            });
        });
    };
    NCMBUser.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, NCMBUser.ncmb.request.exec("GET", "/logout", {})];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3:
                        NCMBUser.ncmb.sessionToken = null;
                        return [2 /*return*/];
                }
            });
        });
    };
    NCMBUser.loginAsAnonymous = function () {
        return __awaiter(this, void 0, void 0, function () {
            var uuid, user;
            return __generator(this, function (_a) {
                uuid = NCMBUser.ncmb.uuid();
                user = new NCMBUser;
                if (user.signUpWith("anonymous", { id: uuid })) {
                    return [2 /*return*/, user];
                }
                else {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/];
            });
        });
    };
    return NCMBUser;
}(index_ts_1.NCMBObject));
exports["default"] = NCMBUser;
