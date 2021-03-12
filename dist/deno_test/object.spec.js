"use strict";
exports.__esModule = true;
var ncmb_ts_1 = require("./deno/ncmb.ts");
var read_json_ts_1 = require("https://deno.land/std@0.66.0/fs/read_json.ts");
var asserts_ts_1 = require("https://deno.land/std@0.65.0/testing/asserts.ts");
var config = await read_json_ts_1.readJson('../config.json');
var applicationKey = config.applicationKey;
var clientKey = config.clientKey;
new ncmb_ts_1["default"](applicationKey, clientKey);
var hello = new ncmb_ts_1.NCMBObject('HelloDeno');
Deno.test({
    name: "Save object",
    fn: function () {
        var hello = new ncmb_ts_1.NCMBObject('Hello');
        yield hello
            .set('message', 'Hello world')
            .set('number', 100)
            .save();
        asserts_ts_1.assertEquals(hello.get('objectId') !== '', true);
    }
});
