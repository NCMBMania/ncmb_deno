import NCMB, { NCMBQuery, NCMBObject } from '../index.ts';
import { allowType } from '../../misc.d.ts';
declare class NCMBPush extends NCMBObject {
    static ncmb: NCMB;
    _fields: {
        [s: string]: any;
    };
    constructor();
    static query(): NCMBQuery;
    set(name: string, value: allowType): NCMBPush;
    save(): Promise<boolean>;
    static open(deviceType: string, deviceToken: string, id: string): Promise<boolean>;
}
export default NCMBPush;
