// @ts-ignore: TS2691
import NCMB from '../ncmb.ts'

class NCMBSignature {
  _ncmb: NCMB
  _signatureMethodName: string
  _signatureMethodValue: string
  _signatureVersionName: string
  _signatureVersionValue: string

  constructor(ncmb: NCMB) {
    this._ncmb = ncmb
    this._signatureMethodName = 'SignatureMethod'
    this._signatureMethodValue = 'HmacSHA256'
    this._signatureVersionName = 'SignatureVersion'
    this._signatureVersionValue = '2'
  }

  create(method: string, time: string, className: string, queries:{ [s: string]: any } = {}, objectId: string|null = null): string {
    const path: string = this._ncmb.path(className, objectId)
    queries[this._signatureMethodName] = this._signatureMethodValue
    queries[this._signatureVersionName] = this._signatureVersionValue
    queries[this._ncmb.applicationKeyName] = this._ncmb.applicationKey
    queries[this._ncmb.timestampName] = time
    const query = Object.keys(queries).sort().map(k => `${k}=${encodeURI(JSON.stringify(queries[k]))}`).join('&')
    const string = [method, this._ncmb.fqdn, path, query].join("\n")
    return this._ncmb.sign(string)
  }
}

export default NCMBSignature
