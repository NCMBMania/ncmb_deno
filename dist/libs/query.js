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
var NCMBQuery = /** @class */ (function () {
    function NCMBQuery(name) {
        this._className = name;
        this._queries = {};
    }
    NCMBQuery.prototype.reset = function () {
        this._queries = {};
        return this;
    };
    NCMBQuery.prototype.where = function (params) {
        this._queries.where = params;
        return this;
    };
    NCMBQuery.prototype.equalTo = function (key, value) {
        return this.setOperand(key, value);
    };
    NCMBQuery.prototype.notEqualTo = function (key, value) {
        return this.setOperand(key, value, '$ne');
    };
    NCMBQuery.prototype.lessThan = function (key, value) {
        return this.setOperand(key, value, '$lt');
    };
    NCMBQuery.prototype.lessThanOrEqualTo = function (key, value) {
        return this.setOperand(key, value, '$lte');
    };
    NCMBQuery.prototype.greaterThan = function (key, value) {
        return this.setOperand(key, value, '$gt');
    };
    NCMBQuery.prototype.greaterThanOrEqualTo = function (key, value) {
        return this.setOperand(key, value, '$gte');
    };
    NCMBQuery.prototype["in"] = function (key, values) {
        return this.setOperand(key, values, '$in');
    };
    NCMBQuery.prototype.notIn = function (key, values) {
        return this.setOperand(key, values, '$nin');
    };
    NCMBQuery.prototype.exists = function (key, exist) {
        if (exist === void 0) { exist = null; }
        if (!exist === null)
            exist = true;
        return this.setOperand(key, exist, '$exists');
    };
    NCMBQuery.prototype.regularExpressionTo = function (key, regex) {
        return this.setOperand(key, regex, '$regex');
    };
    NCMBQuery.prototype.inArray = function (key, values) {
        if (!Array.isArray(values))
            values = [values];
        return this.setOperand(key, values, '$inArray');
    };
    NCMBQuery.prototype.notInArray = function (key, values) {
        if (!Array.isArray(values))
            values = [values];
        return this.setOperand(key, values, '$ninArray');
    };
    NCMBQuery.prototype.allInArray = function (key, values) {
        if (!Array.isArray(values))
            values = [values];
        return this.setOperand(key, values, '$all');
    };
    NCMBQuery.prototype.near = function (key, location) {
        return this.setOperand(key, location.toJSON(), '$nearSphere');
    };
    NCMBQuery.prototype.withinKilometers = function (key, location, maxDistance) {
        this.setOperand(key, maxDistance, '$maxDistanceInKilometers');
        this.setOperand(key, location.toJSON(), '$nearSphere');
        return this;
    };
    NCMBQuery.prototype.withinMiles = function (key, location, maxDistance) {
        this.setOperand(key, maxDistance, '$maxDistanceInMiles');
        this.setOperand(key, location.toJSON(), '$nearSphere');
        return this;
    };
    NCMBQuery.prototype.withinRadians = function (key, location, maxDistance) {
        this.setOperand(key, maxDistance, '$maxDistanceInRadians');
        this.setOperand(key, location.toJSON(), '$nearSphere');
        return this;
    };
    NCMBQuery.prototype.withinSquare = function (key, southWestVertex, northEastVertex) {
        var box = {
            '$box': [
                southWestVertex.toJSON(),
                northEastVertex.toJSON()
            ]
        };
        return this.setOperand(key, box, '$within');
    };
    NCMBQuery.prototype.setOperand = function (key, value, ope) {
        if (ope === void 0) { ope = null; }
        if (value instanceof Date) {
            value = {
                __type: 'Date',
                iso: value.toISOString()
            };
        }
        if (!this._queries.where) {
            this._queries.where = {};
        }
        if (!ope) {
            this._queries.where[key] = value;
            return this;
        }
        if (!this._queries.where[key]) {
            this._queries.where[key] = {};
        }
        this._queries.where[key][ope] = value;
        return this;
    };
    NCMBQuery.prototype.limit = function (number) {
        this._queries.limit = number;
        return this;
    };
    NCMBQuery.prototype.offset = function (number) {
        this._queries.offset = number;
        return this;
    };
    NCMBQuery.prototype.order = function (key, descending) {
        var symbol = descending ? "- " + key : key;
        if (!this._queries.order) {
            this._queries.order = symbol;
        }
        else {
            this._queries.order = this._queries.order + ", " + symbol;
        }
        return this;
    };
    NCMBQuery.prototype.fetchAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, NCMBQuery.ncmb.request.get(this._className, this._queries)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NCMBQuery.prototype.fetch = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.limit(1).fetchAll()];
                    case 1: return [2 /*return*/, (_a.sent())[0]];
                }
            });
        });
    };
    return NCMBQuery;
}());
exports["default"] = NCMBQuery;