import NCMB, { NCMBObject, NCMBQuery } from '../index'
import { authData } from '../@types/misc.d';

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

  async signUpWith(provider: string, auth: authData): Promise<boolean> {
    const expireDate = new Date(auth.expires! + (new Date()).getTime()).toJSON();
    auth.expiration_date = {
      __type: 'Date',
      iso: expireDate
    };
    delete auth.expires;
    this._fields = { authData: {}};
    this._fields.authData[provider] = auth;
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
