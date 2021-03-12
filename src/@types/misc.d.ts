// @ts-ignore TS2691
import NCMBInstallation from '../libs/installation.ts';
// @ts-ignore TS2691
import NCMBObject from '../libs/object.ts'
// import NCMBRole from './libs/';
// @ts-ignore TS2691
import NCMBUser from '../libs/user.ts';
// @ts-ignore TS2691
import NCMBAcl from '../libs/acl.ts'

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

export type allowType = string | Date | number | object | null | NCMBUser | NCMBAcl | NCMBObject | /* NCMBPush | */ NCMBInstallation;
