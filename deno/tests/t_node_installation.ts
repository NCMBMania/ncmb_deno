import NCMB, { NCMBInstallation } from "../index.ts";
const config = require("../../config.json");
const applicationKey = config.applicationKey;
const clientKey = config.clientKey;
new NCMB(applicationKey, clientKey);
(async () => {
    const installation = new NCMBInstallation;
    await installation
        .set("deviceToken", "cccc")
        .set("deviceType", "android")
        .save();
    console.log(installation.get("objectId"));
    await installation
        .set("deviceToken", "dddd")
        .save();
    installation.delete();
})();
