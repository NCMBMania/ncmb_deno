// @ts-ignore TS2691
import NCMB from '../ncmb.ts'
// @ts-ignore TS2691
import NCMBObject from './object.ts'

class NCMBInstallation extends NCMBObject {
  static ncmb: NCMB

  constructor() {
    super('installations')
    super._required = ['deviceToken', 'deviceType']
  }

  set(key: string, value: any): NCMBInstallation {
    return super.set(key, value)
  }
  
  get(k: string): any {
    return super.get(k)
  }

  async fetch(): Promise<NCMBInstallation> {
    return super.fetch(NCMBInstallation.ncmb)
  }

  async delete(): Promise<boolean> {
    return super.delete(NCMBInstallation.ncmb)
  }

  async save(): Promise<NCMBObject | NCMBInstallation> {
    if (['ios', 'android'].indexOf(super.get('deviceType')) === -1) {
      throw new Error(`deviceType is only ios or android`)
    }
    return super.save()
  }
}

export default NCMBInstallation
