// @ts-ignore TS2691
import NCMB from '../ncmb.ts'
// @ts-ignore TS2691
import NCMBObject from './object.ts'

class NCMBUser extends NCMBObject {
  static ncmb: NCMB
  _name: string = 'users'
  _fields: { [s: string]: any } = {}

  constructor() {
    super('users')
  }

  sets(obj: { [s: string]: any }): NCMBUser {
    return super.sets(obj)
  }

  async delete(): Promise<boolean> {
    return super.delete(NCMBUser.ncmb)
  }

  get(k: string): any {
    return super.get(k)
  }

  static async signUp(userName: string, password: string): Promise<NCMBUser> {
    const json = await NCMBUser.ncmb.request.exec('POST', '/users', {}, {
      userName, password
    })
    const user = new NCMBUser()
    NCMBUser.ncmb.sessionToken = json.sessionToken
    delete json.sessionToken
    user.sets(json)
    return user
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
