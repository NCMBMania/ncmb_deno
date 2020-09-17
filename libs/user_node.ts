// @ts-ignore TS2691
import { NCMB, NCMBObject } from '../index'

class NCMBUser extends NCMBObject {
  static ncmb: NCMB

  constructor() {
    super('users')
  }

  static async login(userName: string, password: string): Promise<NCMBUser> {
    const json = await NCMBUser.ncmb.request.exec('GET', '/login', {
      userName, password
    })
    const user = new NCMBUser()
    NCMBUser.ncmb.sessionToken = json.sessionToken
    delete json.sessionToken
    user.sets(json)
    return user
  }
}

export default NCMBUser
