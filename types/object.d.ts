declare class NCMBObject {
  _ncmb: NCMB
  _name: string
  _fields: { [s: string]: any }
  constructor(ncmb: NCMB, name: string)
  sets(obj: { [s: string]: any }): NCMBObject
  set(key: string, value: any): NCMBObject
  get(k: string): any
  save(): Promise<NCMBObject>
}
