// @ts-ignore TS2691
import NCMB from '../ncmb.ts'
// @ts-ignore TS2691
import NCMBInstallation from './installation.ts'
// @ts-ignore TS2691
import NCMBUser from './user.ts'

class NCMBObject {
  static ncmb: NCMB
  _name: string
  _fields: { [s: string]: any }
  _required: string[]
  
  constructor(name: string) {
    this._name = name
    this._fields = {}
    this._required = []
  }

  sets(obj: { [s: string]: any }): NCMBObject | NCMBInstallation | NCMBUser {
    for (let key in obj) {
      this.set(key, obj[key])
    }
    return this
  }

  set(key: string, value: any): NCMBObject | NCMBInstallation | NCMBUser {
    if (['createDate', 'updateDate'].indexOf(key) > -1) {
      this._fields[key] = new Date(value)
    } else if (value && value.__type === 'Date' && value.iso) {
      this._fields[key] = new Date(value.iso)
    } else {
      this._fields[key] = value
    }
    return this
  }

  get(k: string): any {
    return this._fields[k]
  }

  remove(k:string, value: any): NCMBObject | NCMBInstallation | NCMBUser {
    if (!Array.isArray(value)) {
      value = [value];
    }
    this._fields[k] = {__op: 'Remove', objects: value};
    return this;
  }

  add(k:string, value: any): NCMBObject | NCMBInstallation | NCMBUser {
    if (!Array.isArray(value)) {
      value = [value];
    }
    this._fields[k] = {__op: 'Add', objects: value};
    return this;
  }

  addUnique(k:string, value: any): NCMBObject | NCMBInstallation | NCMBUser {
    if (!Array.isArray(value)) {
      value = [value];
    }
    this._fields[k] = {__op: 'AddUnique', objects: value};
    return this;
  }

  getJson(): {[s: string]: any} {
    return {...this._fields, ...{sessionToken: NCMBObject.ncmb.sessionToken}}    
  }

  async save(): Promise<NCMBObject | NCMBInstallation | NCMBUser> {
    for (const key of this._required) {
      const value = this.get(key);
      if (!value || value === '') {
        throw new Error(`${key} is required.`)
      }
    }
    const method = this._fields.objectId ? 'put' : 'post'
    const json = await NCMBObject.ncmb.request[method](this._name, this._fields, this._fields.objectId)
    this.sets(json)
    return this
  }

  async fetch(ncmb?: NCMB): Promise<NCMBObject | NCMBUser | NCMBInstallation> {
    const json = await (ncmb || NCMBObject.ncmb).request.exec('GET', this._name, {}, {}, this._fields.objectId)
    this.sets(json)
    return this
  }

  async delete(ncmb?: NCMB): Promise<boolean> {
    return await (ncmb || NCMBObject.ncmb).request.delete(this._name, this._fields.objectId)
  }

  toJSON(): { [s: string]: string } {
    if (!this.get('objectId')) {
      throw new Error('Save object data before add themselve as Pointer.')
    }
    return {
      __type: 'Pointer',
      objectId: this.get('objectId'),
      className: this._name
    }  
  }
}
export default NCMBObject
