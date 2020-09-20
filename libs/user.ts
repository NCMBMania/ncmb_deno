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

  set(key: string, value: any): NCMBUser {
    return super.set(key, value)
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

  async fetch(): Promise<NCMBUser> {
    return super.fetch(NCMBUser.ncmb)
  }

  static key(): string {
    return `NCMB/${NCMBUser.ncmb.applicationKey}/currentUser`
  }

  getJson(): {[s: string]: any} {
    return {...this._fields, ...{sessionToken: NCMBUser.ncmb.sessionToken}}    
  }

  static async signUp(userName: string, password: string): Promise<NCMBUser> {
    return this.signUpWith({userName, password})
  }

  static async requestSignUpEmail(mailAddress: string): Promise<boolean> {
    try {
      const json = await NCMBUser.ncmb.request.exec('POST', '/requestMailAddressUserEntry', {}, { mailAddress })
      return true
    } catch (err) {
      return false
    }
  }

  static async requestPasswordReset(mailAddress: string): Promise<boolean> {
    try {
      const json = await NCMBUser.ncmb.request.exec('POST', '/requestPasswordReset', {}, { mailAddress })
      return true
    } catch (err) {
      return false
    }
  }
  
  static async signUpWith(params: {[s: string]: any}): Promise<NCMBUser> {
    const json = await NCMBUser.ncmb.request.exec('POST', '/users', {}, params)
    const user = new NCMBUser()
    NCMBUser.ncmb.sessionToken = json.sessionToken
    delete json.sessionToken
    user.sets(json)
    return user
  }

  static async login(userName: string, password: string): Promise<NCMBUser> {
    return this.loginWith({userName, password})
  }

  static async loginWithEmail(mailAddress: string, password: string): Promise<NCMBUser> {
    return this.loginWith({mailAddress, password})
  }

  static async loginWith(params: {[s: string]: any}): Promise<NCMBUser> {
    const json = await NCMBUser.ncmb.request.exec('GET', '/login', params)
    const user = new NCMBUser()
    NCMBUser.ncmb.sessionToken = json.sessionToken
    delete json.sessionToken
    user.sets(json)
    return user
  }

  static async logout(): Promise<void> {
    try {
      await NCMBUser.ncmb.request.exec('GET', '/logout', {});
    } catch (err) {

    }
    NCMBUser.ncmb.sessionToken = null
  }

  static async loginAsAnonymous(): Promise<NCMBUser> {
    const uuid = NCMBUser.ncmb.uuid()
    return this.signUpWith({
      authData:{
        anonymous:{
          id: uuid
        }
      }
    })
  }
}

export default NCMBUser
