import NCMB, { NCMBObject, NCMBQuery, NCMBRequest } from '../ncmb.ts';
import { allowType } from "../@types/misc.d.ts";
class NCMBPush extends NCMBObject {
    static ncmb: NCMB;
    public _fields: {
        [s: string]: any;
    } = {};
    constructor() {
        super("push");
    }
    static query(): NCMBQuery {
        return new NCMBQuery("push");
    }
    set(name: string, value: allowType): NCMBPush {
        if (name === "searchCondition" && value) {
            if (value instanceof NCMBQuery) {
                return super.set(name, value._queries.where);
            }
            if (typeof value === "object") {
                return super.set(name, value);
            }
            throw new Error("Search condition has to be NCMBQuery or object");
        }
        return super.set(name, value) as NCMBPush;
    }
    async save(): Promise<NCMBPush> {
        if (!this._fields.deliveryTime && !this._fields.immediateDeliveryFlag) {
            throw new Error("Push has to set deliveryTime or immediateDeliveryFlag.");
        }
        if (!this._fields.target || !Array.isArray(this._fields.target)) {
            throw new Error("Push has to set target.");
        }
        return await super.save() as NCMBPush;
    }
    static async open(deviceType: string, deviceToken: string, id: string): Promise<boolean> {
        const r = new NCMBRequest;
        const json = await NCMBPush.ncmb.request.exec("POST", `/${NCMBPush.ncmb.version}/push/${id}/openNumber`, {}, { deviceType, deviceToken }) as {
            [s: string]: any;
        };
        return !!json.updateDate;
    }
}
export default NCMBPush;
