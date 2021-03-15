import { describe, it, before } from "mocha";
import NCMB, { NCMBObject, NCMBGeoPoint, NCMBPush, NCMBQuery, NCMBInstallation } from "../index.ts";
const config = require("../../config.json");
import { assert } from "chai";
describe("GeoPoint object", () => {
    before("Init", () => {
        new NCMB(config.applicationKey, config.clientKey);
        const push = new NCMBPush();
    });
    it("Valid object", async () => {
        const lat = 35.6585805;
        const lng = 139.7454329;
        const obj = new NCMBGeoPoint(lat, lng);
        assert.equal(obj.latitude, lat);
        assert.equal(obj.longitude, lng);
    });
    it("Invalid object 1", async () => {
        const lat = 91;
        const lng = 139.7454329;
        try {
            const obj = new NCMBGeoPoint(lat, lng);
            assert.equal(true, false);
        }
        catch (e) {
            assert.equal(e.message, `GeoPoint should not take latitude (${lat}) > 90.0.`);
        }
    });
    it("Invalid object 2", async () => {
        const lat = -91;
        const lng = 139.7454329;
        try {
            const obj = new NCMBGeoPoint(lat, lng);
            assert.equal(true, false);
        }
        catch (e) {
            assert.equal(e.message, `GeoPoint should not take latitude (${lat}) < -90.0.`);
        }
    });
    it("Invalid object 3", async () => {
        const lat = 35.6585805;
        const lng = 181;
        try {
            const obj = new NCMBGeoPoint(lat, lng);
            assert.equal(true, false);
        }
        catch (e) {
            assert.equal(e.message, `GeoPoint should not take longitude (${lng}) > 180.0.`);
        }
    });
    it("Invalid object 4", async () => {
        const lat = 35.6585805;
        const lng = -181;
        try {
            const obj = new NCMBGeoPoint(lat, lng);
            assert.equal(true, false);
        }
        catch (e) {
            assert.equal(e.message, `GeoPoint should not take longitude (${lng}) < -180.0.`);
        }
    });
});
