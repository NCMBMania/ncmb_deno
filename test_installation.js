"use strict";
exports.__esModule = true;
var ncmb_ts_1 = require("./ncmb.ts");
var read_json_ts_1 = require("https://deno.land/std/fs/read_json.ts");
var config = await read_json_ts_1.readJson('./config.json');
var applicationKey = config.applicationKey;
var clientKey = config.clientKey;
var ncmb = new ncmb_ts_1.NCMB(applicationKey, clientKey);
var installation = new ncmb_ts_1.NCMBInstallation;
await installation
    .set('deviceToken', 'aaaa')
    .set('deviceType', 'android')
    .save();
console.log(installation.get('objectId'));
await installation
    .set('deviceToken', 'bbbb')
    .save();
