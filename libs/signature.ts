// @ts-ignore TS2691
import NCMB from '../ncmb.ts'

class NCMBSignature {
  static ncmb: NCMB
  _signatureMethodName: string
  _signatureMethodValue: string
  _signatureVersionName: string
  _signatureVersionValue: string

  constructor() {
    this._signatureMethodName = 'SignatureMethod'
    this._signatureMethodValue = 'HmacSHA256'
    this._signatureVersionName = 'SignatureVersion'
    this._signatureVersionValue = '2'
  }

  create(method: string, time: string, className: string, q:{ [s: string]: any } = {}, objectId: string|null = null): string {
    const queries = {...q}
    const ncmb = NCMBSignature.ncmb
    const path: string = ncmb.path(className, objectId)
    queries[this._signatureMethodName] = this._signatureMethodValue
    queries[this._signatureVersionName] = this._signatureVersionValue
    queries[ncmb.applicationKeyName] = ncmb.applicationKey
    queries[ncmb.timestampName] = time
    const query = Object.keys(queries).sort().map(k => {
      const val = typeof queries[k] === 'object' ? JSON.stringify(queries[k]) : queries[k]
      return `${k}=${encodeURI(val)}`
    }).join('&')
    const string = [method, ncmb.fqdn, path, query].join("\n")
    return ncmb.sign(string)
  }
}

export default NCMBSignature
