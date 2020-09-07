// @ts-ignore: TS2691
import NCMB from '../ncmb.ts'

class NCMBObject {
  _ncmb: NCMB
  _name: string
  _fields: { [s: string]: any }

  constructor(ncmb: NCMB, name: string) {
    this._ncmb = ncmb
    this._name = name
    this._fields = {}
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

  async save(): Promise<NCMBObject> {
    const method = this._fields.objectId ? 'put' : 'post'
    const json = await this._ncmb.request[method](this._name, this._fields, this._fields.objectId)
    this.sets(json)
    return this
  }
}
export default NCMBObject
