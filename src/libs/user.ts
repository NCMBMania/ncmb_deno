// @ts-ignore TS2691
import NCMB, { NCMBObject, NCMBQuery } from '../index.ts'

class NCMBUser extends NCMBObject {
  static ncmb: NCMB
  _name: string = 'users'
  _fields: { [s: string]: any } = {}

  constructor() {
    super('users')
  }

  static query(): NCMBQuery {
    return new NCMBQuery('users')
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
    const json = await NCMBUser.ncmb.request.exec('POST', '/users', {}, {userName, password})
    const user = new NCMBUser()
    NCMBUser.ncmb.sessionToken = json.sessionToken
    delete json.sessionToken
    user.sets(json)
    return user
  }
  
  async signUpByAccount(): Promise<boolean> {
    const json = await NCMBUser.ncmb.request.exec('GET', '/login', this._fields)
    NCMBUser.ncmb.sessionToken = json.sessionToken
    delete json.sessionToken
    this.sets(json)
    return true
  }  

  async signUpWith(provider: string, authData: authData): Promise<boolean> {
    const expireDate = new Date(authData.expires! + (new Date()).getTime()).toJSON();
    authData.expiration_date = {
      __type: 'Date',
      iso: expireDate
    };
    delete authData.expires;
    this._fields = { authData: {}};
    this._fields.authData[provider] = authData;
    return await this.signUpByAccount();
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

  static async loginAsAnonymous(): Promise<NCMBUser | null> {
    const uuid = NCMBUser.ncmb.uuid()
    const user = new NCMBUser;
    if (user.signUpWith('anonymous', { id: uuid })) {
      return user
    } else {
      return null
    }
  }
}

export default NCMBUser
