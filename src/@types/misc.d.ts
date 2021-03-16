import NCMBInstallation from '../libs/installation';
import NCMBObject from '../libs/object'
import NCMBUser from '../libs/user';
import NCMBRole from '../libs/role';
import NCMBAcl from '../libs/acl'
import NCMBRequest from "../libs/request";

interface dateFormat {
  __type: string,
  iso: string
}

export type authData = {
  id?: string,
  access_token?: string,
  expires?: number,
  expiration_date?: dateFormat
}

export type NCMBPointer = {
  objectId: string;
  __type?: string;
  className?: string;
}

export type allowType = string | Date | number | object | null | NCMBUser | NCMBAcl | NCMBObject | /* NCMBPush | */ NCMBInstallation | JsonObject | NCMBPointer | NCMBPointer[];
export type JsonObject = {
  [key:string] : allowType
}

export type roleBaseJson = {
  __op?: string;
  objects?: (NCMBPointer | NCMBObject | NCMBUser | NCMBRole)[];
}
export type roleJson = {
  belongUser?: roleBaseJson;
  belongRole?: roleBaseJson;
}
export type NCMBRelationFormat = {
  __op: string;
  objects: NCMBPointer[];
}
