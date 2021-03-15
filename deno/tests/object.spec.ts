import NCMB, { NCMBObject, NCMBQuery, NCMBAcl, NCMBGeoPoint } from "../index.ts";
const config = require("../../config.json");
const applicationKey = config.applicationKey;
const clientKey = config.clientKey;
import * as assert from "assert";
import NCMBUser from "../libs/user.ts";
describe("Object test:", () => {
    before("Initialize NCMB", () => {
        new NCMB(applicationKey, clientKey);
    });
    it("Save object", async () => {
        const hello = new NCMBObject("Hello");
        await hello
            .set("message", "Hello world")
            .set("number", 100)
            .save();
        assert.equal(hello.get("objectId") !== "", true);
    });
    it("Update object", async () => {
        const hello = new NCMBObject("Hello");
        await hello
            .set("message", "Hello world")
            .set("number", 100)
            .save();
        assert.equal(hello.get("objectId") !== "", true);
        const message = "Update message";
        await hello
            .set("message", message)
            .save();
        const hello2 = new NCMBObject("Hello");
        hello2.set("objectId", hello.get("objectId"));
        await hello2.fetch();
        assert.equal(hello.get("objectId"), hello2.get("objectId"));
        assert.equal(hello2.get("message"), message);
    });
    it("Save with object", async () => {
        const hello = new NCMBObject("Hello");
        const message = "Hello world";
        await hello
            .set("message", message)
            .set("number", 100)
            .save();
        assert.equal(hello.get("objectId") !== "", true);
        const hello2 = new NCMBObject("Hello");
        await hello2
            .set("message", "Relative object")
            .set("hello", hello)
            .set("number", 100)
            .save();
        assert.equal(hello2.get("objectId") !== "", true);
        const Hello = new NCMBQuery("Hello");
        const hello3 = await Hello
            .include("hello")
            .equalTo("objectId", hello2.get("objectId"))
            .fetch();
        if (hello3) {
            assert.equal(hello3.get("hello").get("message"), message);
        }
        else {
            assert.equal(true, false);
        }
    });
    it("Increment object", async () => {
        const hello = new NCMBObject("Hello");
        const message = "Hello world";
        await hello
            .set("message", message)
            .set("number", 100)
            .save();
        await hello
            .setIncrement("number", 2)
            .save();
        await hello.fetch();
        assert.equal(hello.get("number"), 102);
    });
    it("Save with Acl", async () => {
        const hello = new NCMBObject("Hello");
        const acl = new NCMBAcl;
        acl
            .setRoleReadAccess("Admin", true)
            .setRoleWriteAccess("Admin", true);
        const message = "Hello world";
        await hello
            .set("message", message)
            .set("number", 100)
            .set("acl", acl)
            .save();
        try {
            hello.fetch();
            assert.equal(true, false);
        }
        catch (e) {
        }
        await NCMBUser.login("admin", "admin");
        await hello.fetch();
        assert.equal(hello.get("number"), 100);
        await hello.delete();
        await NCMBUser.logout();
    });
    it("Save with GeoPoint", async () => {
        const hello = new NCMBObject("Hello");
        const lat = 35.6585805;
        const geo = new NCMBGeoPoint(lat, 139.7454329);
        hello
            .set("geo", geo)
            .save();
        await hello.fetch();
        assert.equal(hello.get("geo") instanceof NCMBGeoPoint, true);
        assert.equal(hello.get("geo").latitude, lat);
    });
    after("Delete all data", async () => {
        const p: Promise<boolean>[] = [];
        const Hello = new NCMBQuery("Hello");
        const ary = await Hello
            .limit(1000)
            .fetchAll();
        ary.forEach((o: NCMBObject) => p.push(o.delete()));
        await Promise.all(p);
    });
});
