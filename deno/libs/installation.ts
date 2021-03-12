import NCMB, { NCMBObject, NCMBQuery } from '../ncmb.ts';
class NCMBInstallation extends NCMBObject {
    static ncmb: NCMB;
    constructor() {
        super("installations");
        this._required = ["deviceToken", "deviceType"];
    }
    static query(): NCMBQuery {
        return new NCMBQuery("installations");
    }
    async save(): Promise<NCMBInstallation> {
        if (["ios", "android"].indexOf(super.get("deviceType")) === -1) {
            throw new Error(`deviceType is only ios or android`);
        }
        return await super.save() as NCMBInstallation;
    }
}
export default NCMBInstallation;
