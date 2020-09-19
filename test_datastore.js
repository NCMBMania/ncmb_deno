"use strict";
exports.__esModule = true;
var ncmb_ts_1 = require("./ncmb.ts");
var read_json_ts_1 = require("https://deno.land/std/fs/read_json.ts");
var config = await read_json_ts_1.readJson('./config.json');
var applicationKey = config.applicationKey;
var clientKey = config.clientKey;
var ncmb = new ncmb_ts_1.NCMB(applicationKey, clientKey);
var hello = new ncmb_ts_1.NCMBObject('HelloDeno');
await hello
    .set('message', 'Hello world')
    .set('number', 100)
    .set('date', new Date)
    .save();
await hello
    .set('number', 200)
    .save();
var acl = new ncmb_ts_1.NCMBAcl();
acl
    .setPublicReadAccess(true)
    .setPublicWriteAccess(false);
var geo = new ncmb_ts_1.NCMBGeoPoint(35.0, 100.0);
var hello2 = new ncmb_ts_1.NCMBObject('HelloDeno');
await hello2
    .set('message', 'Hello world')
    .set('number', 100)
    .set('acl', acl)
    .set('hello1', hello)
    .set('geo', geo)
    .save();
console.log(hello.get('objectId'));
var user = await ncmb_ts_1.NCMBUser.login('tester', 'tester');
var query = new ncmb_ts_1.NCMBQuery('HelloDeno');
query.equalTo('objectId', 'DPnmQfMGTMuSS44Q');
query.limit(1);
var results = await query.fetchAll();
console.log(results);
