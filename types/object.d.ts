import NCMBInstallation from "./installation.d.ts";

declare class NCMBObject {
  static ncmb: NCMB
  _name: string
  _fields: { [s: string]: any }
  constructor(name: string)

  sets(obj: { [s: string]: any }): NCMBObject
  set(key: string, value: any): NCMBObject
  get(k: string): any
  save(): Promise<NCMBObject | NCMBInstallation>
}
