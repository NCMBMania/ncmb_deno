"use strict";
exports.__esModule = true;
// @ts-ignore TS2691
var NCMBGeoPoint = /** @class */ (function () {
    function NCMBGeoPoint(lat, lng) {
        this._latitude = lat;
        this._longitude = lng;
        this.valid();
    }
    NCMBGeoPoint.prototype.valid = function () {
        if (isNaN(this._latitude) || isNaN(this._longitude)) {
            throw new Error('GeoPoint latitude and longitude should be number');
        }
        if (this._latitude < -90.0) {
            throw new Error("GeoPoint should not take latitude (" + this._latitude + ") < -90.0.");
        }
        if (this._latitude > 90.0) {
            throw new Error("GeoPoint should not take latitude (" + this._latitude + ") > 90.0.");
        }
        if (this._longitude < -180.0) {
            throw new Error("GeoPoint should not take longitude (" + this._longitude + ") < -180.0.");
        }
        if (this._longitude > 180.0) {
            throw new Error("GeoPoint should not take longitude (" + this._longitude + ") > 180.0.");
        }
    };
    NCMBGeoPoint.prototype.toJSON = function () {
        return {
            __type: "GeoPoint",
            latitude: this._latitude,
            longitude: this._longitude
        };
    };
    return NCMBGeoPoint;
}());
exports["default"] = NCMBGeoPoint;
