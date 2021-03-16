// @ts-ignore TS2691
import NCMBInstallation from "../libs/installation.ts";
// @ts-ignore TS2691
import NCMBObject from "../libs/object.ts";
// import NCMBRole from './libs/';
// @ts-ignore TS2691
import NCMBUser from "../libs/user.ts";
// @ts-ignore TS2691
import NCMBAcl from "../libs/acl.ts";
// @ts-ignore TS2691
import NCMBRequest from "../libs/request.ts";
// @ts-ignore TS2691
import NCMBRole from "../libs/role.ts";
interface dateFormat {
    __type: string;
    iso: string;
}
export type authData = {
    id?: string;
    access_token?: string;
    expires?: number;
    expiration_date?: dateFormat;
};
export type NCMBPointer = {
    objectId: string;
    __type?: string;
    className?: string;
};
export type allowType = string | Date | number | object | null | NCMBUser | NCMBAcl | NCMBObject | /* NCMBPush | */ NCMBInstallation | JsonObject | NCMBPointer | NCMBPointer[];
export type JsonObject = {
    [key: string]: allowType;
};
export type roleBaseJson = {
    __op?: string;
    objects?: (NCMBPointer | NCMBObject | NCMBUser | NCMBRole)[];
}
export type roleJson = {
    belongUser?: roleBaseJson;
    belongRole?: roleBaseJson;
};
export type NCMBRelationFormat = {
    __op: string;
    objects: NCMBPointer[];
};
