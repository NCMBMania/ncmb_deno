import NCMBUser from "./user.d.ts";

declare class NCMBAcl {
  _fields: { [s: string]: {[s: string]: boolean} }
  constructor()
  setPublicReadAccess(bol: boolean): NCMBAcl
  setPublicWriteAccess(bol: boolean): NCMBAcl
  setUserReadAccess(user: NCMBUser, bol: boolean): NCMBAcl
  setUserWriteAccess(user: NCMBUser, bol: boolean): NCMBAcl
  setRoleReadAccess(role: string, bol: boolean): NCMBAcl
  setRoleWriteAccess(role: string, bol: boolean): NCMBAcl
  toJSON(): { [s: string]: {[s: string]: boolean} }
}

export default NCMBAcl
