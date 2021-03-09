import NCMBObject from './libs/object'
import NCMBSignature from './libs/signature'
import NCMBRequest from './libs/request'
import NCMBQuery from './libs/query'
import NCMBInstallation from './libs/installation'
import NCMBUser from './libs/user'
import NCMBAcl from './libs/acl'
import NCMBGeoPoint from './libs/geopoint'

import * as crypto from 'crypto';
import fetch, { Response } from 'node-fetch'
import { v4 as uuidv4 } from 'uuid'
import { CLIENT_RENEG_WINDOW } from 'tls'

export { NCMBObject, NCMBQuery, NCMBInstallation, NCMBUser, NCMBAcl, NCMBGeoPoint }

export default class NCMB {
  applicationKey: string
  clientKey: string
  fqdn: string
  version: string
  applicationKeyName: string
  timestampName: string
  signature!: NCMBSignature
  request!: NCMBRequest
  sessionToken: string | null = null
  sessionTokenHeader: string

  constructor(applicationKey: string, clientKey: string) {
    this.applicationKey = applicationKey
    this.clientKey = clientKey
    this.fqdn = 'mbaas.api.nifcloud.com'
    this.version = '2013-09-01'
    this.applicationKeyName = 'X-NCMB-Application-Key'
    this.timestampName = 'X-NCMB-Timestamp'
    this.sessionTokenHeader = 'X-NCMB-Apps-Session-Token'
    this.signature = new NCMBSignature
    this.request = new NCMBRequest
    this.initObject()
  }

  initObject(this: NCMB) {
    NCMBQuery.ncmb = this
    NCMBRequest.ncmb = this
    NCMBSignature.ncmb = this
    NCMBObject.ncmb = this
    NCMBInstallation.ncmb = this
    NCMBUser.ncmb = this
  }

  path(className: string, objectId: string|null): string {
    if (className.indexOf('/') === 0) {
      return `/${this.version}${className}/${objectId || ''}`;
    }
    if (['installations', 'users', 'files', 'push'].indexOf(className) > -1) {
      return `/${this.version}/${className}/${objectId || ''}`;
    }
    return `/${this.version}/classes/${className}/${objectId || ''}`;
  }

  url(className: string, queries:{ [s: string]: any } = {}, objectId: string|null) {
    const query = Object.keys(queries).sort().map(k => {
      const val = typeof queries[k] === 'object' ? JSON.stringify(queries[k]) : queries[k]
      return `${k}=${encodeURI(val)}`
    }).join('&');
    return `https://${this.fqdn}${this.path(className, objectId)}${query ? '?' + query : ''}`
  }

  base64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer)
    const len = bytes.length
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    const ary = []
    for (let i = 0; i < len; i+=3) {
      ary.push(chars[bytes[i] >> 2])
      ary.push(chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)])
      ary.push(chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)])
      ary.push(chars[bytes[i + 2] & 63])
    }
    const str = ary.join('')
    let result = ''
    if ((len % 3) === 2) {
      result = str.substring(0, str.length - 1) + "="
    } else if (len % 3 === 1) {
      result = str.substring(0, str.length - 2) + "=="
    }
    return result
  }

  sign(str: string): string {
    const hmac = crypto.createHmac('sha256', this.clientKey)
    return this.base64(hmac.update(str).digest())
  }

  uuid(): string {
    return uuidv4()
  }
  
  fetch(url: string, options: any): Promise<Response> {
    if (typeof window !== 'undefined') {
      return fetch.bind(window)(url, options);
    }
    return fetch(url, options);
  }
}
