// @ts-ignore TS2691
import NCMBUser from './user.ts'

class NCMBAcl {
  _fields: { [s: string]: {[s: string]: boolean} }
  constructor() {
    this._fields = {
      '*': {
        read: true,
        write: true
      }
    }
  }

  setPublicReadAccess(bol: boolean): NCMBAcl {
    this._fields['*'].read = bol;
    return this;
  }

  setPublicWriteAccess(bol: boolean): NCMBAcl {
    this._fields['*'].write = bol;
    return this;
  }

  initWhere(key: string): void {
    if (!this._fields[key]) {
      this._fields[key] = {
        read: false,
        write: false
      }
    }
  }
  
  setUserReadAccess(user: NCMBUser, bol: boolean): NCMBAcl {
    this.initWhere(user.get('objectId'));
    this._fields[user.get('objectId')].read = bol;
    return this;
  }

  setUserWriteAccess(user: NCMBUser, bol: boolean): NCMBAcl {
    this.initWhere(user.get('objectId'));
    this._fields[user.get('objectId')].write = bol;
    return this;
  }

  setRoleReadAccess(role: string, bol: boolean): NCMBAcl {
    this.initWhere(`role:${role}`);
    this._fields[`role:${role}`].read = bol;
    return this;
  }

  setRoleWriteAccess(role: string, bol: boolean): NCMBAcl {
    this.initWhere(`role:${role}`);
    this._fields[`role:${role}`].write = bol;
    return this;
  }
  
  toJSON(): { [s: string]: {[s: string]: boolean} } {
    const params: {[s: string]: {[s: string]: boolean}} = {}
    for (const key in this._fields) {
      const p = this._fields[key]
      if (p.read || p.write) {
        params[key] = {}
      }
      if (this._fields[key].read) {
        params[key].read = true
      }
      if (this._fields[key].write) {
        params[key].read = true
      }
    }
    return params
  }
}

export default NCMBAcl
