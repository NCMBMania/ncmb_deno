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
var assert = require("assert");
describe('Query test:', function () {
    before('Initialize NCMB', function () { return __awaiter(void 0, void 0, void 0, function () {
        var i, obj;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    new index_1["default"](applicationKey, clientKey);
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 10)) return [3 /*break*/, 4];
                    obj = new index_1.NCMBObject('QueryTest');
                    return [4 /*yield*/, obj
                            .set('number', i)
                            .save()];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it('Get with count', function () { return __awaiter(void 0, void 0, void 0, function () {
        var query, number, _a, count, results;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    query = new index_1.NCMBQuery('QueryTest');
                    number = 6;
                    return [4 /*yield*/, query.limit(number).fetchWithCount()];
                case 1:
                    _a = _b.sent(), count = _a.count, results = _a.results;
                    assert.equal(count, 10);
                    assert.equal(results.length, number);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Using select (sub query)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var promises, index, i, j, queryTest, queryTest2, ary;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promises = [];
                    for (index = 0; index < 5; index++) {
                        i = new index_1.NCMBObject('Test');
                        promises.push(i
                            .set('string', "I'm item #" + index)
                            .set('number', index)
                            .save());
                        j = new index_1.NCMBObject('Test2');
                        promises.push(j
                            .set('string', "I'm test2 #" + index)
                            .set('num', index)
                            .save());
                    }
                    return [4 /*yield*/, Promise.all(promises)];
                case 1:
                    _a.sent();
                    queryTest = new index_1.NCMBQuery('Test');
                    queryTest2 = new index_1.NCMBQuery('Test2');
                    queryTest2["in"]('num', [1, 4]);
                    return [4 /*yield*/, queryTest.select('number', 'num', queryTest2).fetchAll()];
                case 2:
                    ary = _a.sent();
                    ary.forEach(function (a) {
                        assert.equal([1, 4].indexOf(a.get('number')) > -1, true);
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('Using inQuery (sub query)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var promises, ary, index, i, res, promises2, ary2, index, i, res2, queryTest, queryTest2, ary3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promises = [];
                    ary = [];
                    for (index = 0; index < 5; index++) {
                        i = new index_1.NCMBObject('Test');
                        promises.push(i
                            .set('string', "I'm item #" + index)
                            .set('number', index)
                            .save());
                        ary.push(i);
                    }
                    return [4 /*yield*/, Promise.all(promises)];
                case 1:
                    res = _a.sent();
                    promises2 = [];
                    ary2 = [];
                    for (index = 0; index < 5; index++) {
                        i = new index_1.NCMBObject('Test2');
                        promises2.push(i
                            .set('string', "I'm test2 #" + index)
                            .set('num', ary[index])
                            .save());
                        ary2.push(i);
                    }
                    return [4 /*yield*/, Promise.all(promises2)];
                case 2:
                    res2 = _a.sent();
                    queryTest = new index_1.NCMBQuery('Test');
                    queryTest2 = new index_1.NCMBQuery('Test2');
                    queryTest["in"]('number', [1, 4]);
                    return [4 /*yield*/, queryTest2.inQuery('num', queryTest).include('num').fetchAll()];
                case 3:
                    ary3 = _a.sent();
                    assert.equal(ary3.length, 2);
                    ary3.forEach(function (a) {
                        assert.equal([1, 4].indexOf(a.get('num').get('number')) > -1, true);
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    after('Delete all data', function () { return __awaiter(void 0, void 0, void 0, function () {
        var p, _i, _a, name_1, query, ary;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    p = [];
                    _i = 0, _a = ['QueryTest', 'Test', 'Test2'];
                    _b.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    name_1 = _a[_i];
                    query = new index_1.NCMBQuery(name_1);
                    return [4 /*yield*/, query
                            .limit(1000)
                            .fetchAll()];
                case 2:
                    ary = _b.sent();
                    ary.forEach(function (o) { return p.push(o["delete"]()); });
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [4 /*yield*/, Promise.all(p)];
                case 5:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
