import NCMB, { NCMBObject, NCMBQuery } from '../index.ts';
declare class NCMBInstallation extends NCMBObject {
    static ncmb: NCMB;
    constructor();
    static query(): NCMBQuery;
    set(key: string, value: any): NCMBInstallation;
    get(k: string): any;
    fetch(): Promise<NCMBInstallation>;
    delete(): Promise<boolean>;
    save(): Promise<NCMBObject | NCMBInstallation>;
}
export default NCMBInstallation;
