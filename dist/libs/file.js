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
var FormData = require("form-data");
// import { Buffer } from '../ncmb'
var NCMBFile = /** @class */ (function (_super) {
    __extends(NCMBFile, _super);
    function NCMBFile() {
        return _super.call(this, 'files') || this;
    }
    NCMBFile.query = function () {
        return new index_1.NCMBQuery('files');
    };
    NCMBFile.upload = function (fileName, fileData, acl, contentType) {
        return __awaiter(this, void 0, void 0, function () {
            var r, form, json, file, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        r = new index_1.NCMBRequest;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        form = new FormData();
                        contentType = contentType || 'application/octet-stream';
                        if (typeof fileData === 'string') {
                            form.append('file', fileData, contentType);
                        }
                        else {
                            form.append('file', fileData, NCMBFile.ncmb.contentType(contentType));
                        }
                        form.append('acl', JSON.stringify((acl || new index_1.NCMBAcl).toJSON()));
                        return [4 /*yield*/, r.exec('POST', 'files', {}, form, fileName)];
                    case 2:
                        json = _a.sent();
                        file = new NCMBFile;
                        return [2 /*return*/, file.sets(json)];
                    case 3:
                        e_1 = _a.sent();
                        throw e_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    NCMBFile.prototype.download = function (fileType) {
        if (fileType === void 0) { fileType = 'text'; }
        return __awaiter(this, void 0, void 0, function () {
            var r, response, json, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        r = new index_1.NCMBRequest;
                        return [4 /*yield*/, r.exec('GET', 'files', {}, {}, this._fields.fileName, false)];
                    case 1:
                        response = _b.sent();
                        if (!(response.status > 400)) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        json = _b.sent();
                        if (json.code) {
                            // エラー
                            throw new Error(json.code + ": " + json.error);
                        }
                        else {
                            throw new Error("Server error " + response.status);
                        }
                        _b.label = 3;
                    case 3:
                        _a = fileType.toUpperCase();
                        switch (_a) {
                            case 'TEXT': return [3 /*break*/, 4];
                            case 'BINARY': return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 8];
                    case 4: return [4 /*yield*/, response.text()];
                    case 5: return [2 /*return*/, _b.sent()];
                    case 6: return [4 /*yield*/, response.blob()];
                    case 7: return [2 /*return*/, _b.sent()];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    NCMBFile.prototype.getDataUri = function (blob) {
        return new Promise(function (res, _) {
            var reader = new FileReader();
            reader.onloadend = function () {
                res(reader.result);
            };
            reader.readAsDataURL(blob);
        });
    };
    NCMBFile.path = function (fileName) {
        return "/" + NCMBFile.ncmb.version + "/files/" + fileName;
    };
    NCMBFile.prototype.path = function () {
        return "/" + NCMBFile.ncmb.version + "/files/" + this.get('fileName');
    };
    return NCMBFile;
}(index_1.NCMBObject));
exports["default"] = NCMBFile;
