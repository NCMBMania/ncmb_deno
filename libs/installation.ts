// @ts-ignore TS2691
import NCMB from '../ncmb.ts'
// @ts-ignore TS2691
import NCMBObject from './object.ts'

class NCMBInstallation extends NCMBObject {
  constructor() {
    super('installations')
    super._required = ['deviceToken', 'deviceType']
  }

  async save(): Promise<NCMBObject | NCMBInstallation> {
    if (['ios', 'android'].indexOf(super.get('deviceType')) === -1) {
      throw new Error(`deviceType is only ios or android`)
    }
    return super.save()
  }
}

export default NCMBInstallation
