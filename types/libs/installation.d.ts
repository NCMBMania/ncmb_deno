import NCMB from '../ncmb.ts';
import NCMBObject from './object.ts';
declare class NCMBInstallation extends NCMBObject {
    static ncmb: NCMB;
    constructor();
    set(key: string, value: any): NCMBInstallation;
    get(k: string): any;
    fetch(): Promise<NCMBInstallation>;
    delete(): Promise<boolean>;
    save(): Promise<NCMBObject | NCMBInstallation>;
}
export default NCMBInstallation;
