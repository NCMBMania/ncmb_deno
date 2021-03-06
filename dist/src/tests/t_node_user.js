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
var index_1 = require("../index");
var config = require('../../config.json');
var applicationKey = config.applicationKey;
var clientKey = config.clientKey;
new index_1["default"](applicationKey, clientKey);
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var user, user2, anony, signUpUser, mailAddress, password, emailLogin, u;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.NCMBUser.login('tester', 'tester')];
            case 1:
                user = _a.sent();
                console.log(user);
                return [4 /*yield*/, index_1.NCMBUser.signUp('tester2', 'tester')];
            case 2:
                user2 = _a.sent();
                console.log(user2.get('objectId'));
                return [4 /*yield*/, user2["delete"]()];
            case 3:
                _a.sent();
                return [4 /*yield*/, index_1.NCMBUser.logout()];
            case 4:
                _a.sent();
                return [4 /*yield*/, index_1.NCMBUser.loginAsAnonymous()];
            case 5:
                anony = _a.sent();
                console.log(anony);
                return [4 /*yield*/, index_1.NCMBUser.logout()];
            case 6:
                _a.sent();
                return [4 /*yield*/, index_1.NCMBUser.signUp('tester3', 'tester3')];
            case 7:
                signUpUser = _a.sent();
                console.log(signUpUser.get('objectId'));
                return [4 /*yield*/, signUpUser["delete"]()];
            case 8:
                _a.sent();
                return [4 /*yield*/, index_1.NCMBUser.logout()];
            case 9:
                _a.sent();
                return [4 /*yield*/, index_1.NCMBUser.requestSignUpEmail('tester4@moongift.jp')];
            case 10:
                _a.sent();
                mailAddress = 'tester3@moongift.jp';
                password = '7CbdL6@nVbMQCKF';
                return [4 /*yield*/, index_1.NCMBUser.logout()];
            case 11:
                _a.sent();
                return [4 /*yield*/, index_1.NCMBUser.loginWithEmail(mailAddress, password)];
            case 12:
                emailLogin = _a.sent();
                console.log(emailLogin);
                return [4 /*yield*/, index_1.NCMBUser.requestPasswordReset(mailAddress)];
            case 13:
                _a.sent();
                u = new index_1.NCMBUser;
                u.set('objectId', '7iEjQO7b4DFQXn0R');
                return [4 /*yield*/, u.fetch()];
            case 14:
                _a.sent();
                console.log(u);
                return [2 /*return*/];
        }
    });
}); })();
