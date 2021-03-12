import NCMB from "../index.ts";
import NCMBInstallation from "./installation.ts";
import NCMBUser from "./user.ts";
declare class NCMBObject {
    static ncmb: NCMB;
    _name: string;
    _fields: {
        [s: string]: any;
    };
    _required: string[];
    constructor(name: string);
    sets(obj: {
        [s: string]: any;
    }): NCMBObject | NCMBInstallation | NCMBUser;
    set(key: string, value: any): NCMBObject | NCMBInstallation | NCMBUser;
    get(k: string): any;
    add(k: string, value: any): NCMBObject | NCMBInstallation | NCMBUser;
    addUnique(k: string, value: any): NCMBObject | NCMBInstallation | NCMBUser;
    remove(k: string, value: any): NCMBObject | NCMBInstallation | NCMBUser;
    addOrRemove(k: string, objects: any, __op: string): this;
    setIncrement(name: string, value: number): NCMBObject | NCMBUser | NCMBInstallation;
    getJson(): {
        [s: string]: any;
    };
    save(): Promise<NCMBObject | NCMBInstallation | NCMBUser>;
    fetch(ncmb?: NCMB): Promise<NCMBObject | NCMBUser | NCMBInstallation>;
    delete(ncmb?: NCMB): Promise<boolean>;
    toJSON(): {
        [s: string]: string;
    };
}
export default NCMBObject;
