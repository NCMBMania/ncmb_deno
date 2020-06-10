import NCMBObject from './object.ts'
import NCMBSignature from './signature.ts'
import NCMBRequest from './request.ts'
import NCMBQuery from './query.ts'

class NCMB {
  applicationKey: string
  clientKey: string
  fqdn: string
  version: string
  applicationKeyName: string
  timestampName: string
  signature: NCMBSignature
  request: NCMBRequest

  constructor(applicationKey: string, clientKey: string) {
    this.applicationKey = applicationKey
    this.clientKey = clientKey
    this.fqdn = 'mbaas.api.nifcloud.com'
    this.version = '2013-09-01'
    this.signature = new NCMBSignature(this)
    this.applicationKeyName = 'X-NCMB-Application-Key'
    this.timestampName = 'X-NCMB-Timestamp'
    this.request = new NCMBRequest(this)
  }

  Object(name: string): NCMBObject {
    return new NCMBObject(this, name)
  }

  Query(name: string): NCMBQuery {
    return new NCMBQuery(this, name)
  }

  path(className: string, objectId: string|null) {
    return `/${this.version}/classes/${className}/${objectId || ''}`;
  }

  url(className: string, queries:{ [s: string]: any } = {}, objectId: string|null) {
    const query = Object.keys(queries).sort().map(k => `${k}=${encodeURI(JSON.stringify(queries[k]))}`).join('&');
    return `https://${this.fqdn}${this.path(className, objectId)}${query ? '?' + query : ''}`;
  }
}

export default NCMB
