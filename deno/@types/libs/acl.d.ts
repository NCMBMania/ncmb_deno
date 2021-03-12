import NCMBUser from "./user.ts";
declare class NCMBAcl {
    _fields: {
        [s: string]: {
            [s: string]: boolean;
        };
    };
    constructor();
    sets(params: {
        [s: string]: {
            [s: string]: boolean;
        };
    }): NCMBAcl;
    setPublicReadAccess(bol: boolean): NCMBAcl;
    setPublicWriteAccess(bol: boolean): NCMBAcl;
    initWhere(key: string): void;
    setUserReadAccess(user: NCMBUser, bol: boolean): NCMBAcl;
    setUserWriteAccess(user: NCMBUser, bol: boolean): NCMBAcl;
    setRoleReadAccess(role: string, bol: boolean): NCMBAcl;
    setRoleWriteAccess(role: string, bol: boolean): NCMBAcl;
    toJSON(): {
        [s: string]: {
            [s: string]: boolean;
        };
    };
}
export default NCMBAcl;
