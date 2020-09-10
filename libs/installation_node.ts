import NCMBObject from './object'

class NCMBInstallation extends NCMBObject {
  constructor() {
    super('installations')
    this._required = ['deviceToken', 'deviceType']
  }

  async save(): Promise<NCMBObject | NCMBInstallation> {
    if (['ios', 'android'].indexOf(this.get('deviceType')) === -1) {
      throw new Error(`deviceType is only ios or android`)
    }
    return super.save()
  }
}

export default NCMBInstallation
