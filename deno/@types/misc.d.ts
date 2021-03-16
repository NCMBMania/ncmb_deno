import NCMBInstallation from "../libs/installation.ts";
import NCMBObject from "../libs/object.ts";
import NCMBUser from "../libs/user.ts";
import NCMBRole from "../libs/role.ts";
import NCMBAcl from "../libs/acl.ts";
import NCMBRequest from "../libs/request.ts";
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
};
export type roleJson = {
    belongUser?: roleBaseJson;
    belongRole?: roleBaseJson;
};
export type NCMBRelationFormat = {
    __op: string;
    objects: NCMBPointer[];
};
