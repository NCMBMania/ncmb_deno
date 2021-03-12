import NCMB, { NCMBObject, NCMBQuery, NCMBAcl, NCMBGeoPoint } from "../index.ts";
const config = require("../../config.json");
const applicationKey = config.applicationKey;
const clientKey = config.clientKey;
new NCMB(applicationKey, clientKey);
(async () => {
    const query = new NCMBQuery("QueryTest");
    const results = await query.equalTo("string", "Hello").fetchAll();
    console.log("equalTo", results.length, results[0].get("objectId"));
})();
(async () => {
    const query = new NCMBQuery("QueryTest");
    const results = await query.notEqualTo("string", "Hello").fetchAll();
    console.log("notEqualTo", results.length, results[0].get("objectId"));
})();
(async () => {
    const query = new NCMBQuery("QueryTest");
    const results = await query.lessThan("number", 200).fetchAll();
    console.log("lessThan", results.length, results[0].get("objectId"));
})();
(async () => {
    const query = new NCMBQuery("QueryTest");
    const results = await query.lessThanOrEqualTo("number", 200).fetchAll();
    console.log("lessThanOrEqualTo", results.length, results[0].get("objectId"));
})();
(async () => {
    const query = new NCMBQuery("QueryTest");
    const results = await query.lessThanOrEqualTo("date", new Date(2020, 8, 16, 9, 0, 0)).fetchAll();
    console.log("lessThanOrEqualTo (date)", results.length, results[0].get("objectId"));
})();
(async () => {
    const query = new NCMBQuery("QueryTest");
    const results = await query.lessThan("date", new Date(2020, 8, 16, 9, 0, 0)).fetchAll();
    console.log("lessThan (date)", results.length, results[0].get("objectId"));
})();
(async () => {
    const query = new NCMBQuery("QueryTest");
    const results = await query.in("array", ["c"]).fetchAll();
    console.log("in", results.length, results[0].get("objectId"));
})();
(async () => {
    const query = new NCMBQuery("QueryTest");
    const { count, results } = await query.fetchWithCount();
    console.log("count", results.length, count);
})();
(async () => {
    const obj1 = new NCMBObject("Hello");
    await obj1
        .set("num", 1)
        .save();
    const obj2 = new NCMBObject("Hello");
    await obj2
        .set("num", 2)
        .save();
    await obj1
        .set("obj", obj2)
        .save();
    const query = new NCMBQuery("Hello");
    const ary = await query
        .include("obj")
        .fetchAll();
    console.log("include", ary.length);
})();
(async () => {
    const query1 = new NCMBQuery("QueryTest");
    query1.lessThan("date", new Date(2020, 8, 16, 9, 0, 0));
    const query2 = new NCMBQuery("QueryTest");
    query2.lessThanOrEqualTo("number", 200);
    const query = new NCMBQuery("QueryTest");
    const ary = await query.or([query1, query2]).fetchAll();
    console.log(ary);
})();
