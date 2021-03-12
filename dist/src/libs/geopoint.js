"use strict";
exports.__esModule = true;
// @ts-ignore TS2691
var NCMBGeoPoint = /** @class */ (function () {
    function NCMBGeoPoint(lat, lng) {
        this.latitude = lat;
        this.longitude = lng;
        this.valid();
    }
    NCMBGeoPoint.prototype.valid = function () {
        if (isNaN(this.latitude) || isNaN(this.longitude)) {
            throw new Error('GeoPoint latitude and longitude should be number');
        }
        if (this.latitude < -90.0) {
            throw new Error("GeoPoint should not take latitude (" + this.latitude + ") < -90.0.");
        }
        if (this.latitude > 90.0) {
            throw new Error("GeoPoint should not take latitude (" + this.latitude + ") > 90.0.");
        }
        if (this.longitude < -180.0) {
            throw new Error("GeoPoint should not take longitude (" + this.longitude + ") < -180.0.");
        }
        if (this.longitude > 180.0) {
            throw new Error("GeoPoint should not take longitude (" + this.longitude + ") > 180.0.");
        }
    };
    NCMBGeoPoint.prototype.toJSON = function () {
        return {
            __type: "GeoPoint",
            latitude: this.latitude,
            longitude: this.longitude
        };
    };
    return NCMBGeoPoint;
}());
exports["default"] = NCMBGeoPoint;
