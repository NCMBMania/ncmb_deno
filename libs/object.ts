// @ts-ignore TS2691
import NCMB from '../ncmb.ts'
// @ts-ignore TS2691
import NCMBInstallation from './installation.ts'

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

  sets(obj: { [s: string]: any }): NCMBObject {
    for (let key in obj) {
      this.set(key, obj[key])
    }
    return this
  }

  set(key: string, value: any): NCMBObject {
    this._fields[key] = value
    return this
  }

  get(k: string): any {
    return this._fields[k]
  }

  async save(): Promise<NCMBObject | NCMBInstallation> {
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
}
export default NCMBObject
