/// <reference types="node" />
import NCMBObject from './libs/object'
import NCMBSignature from './libs/signature'
import NCMBRequest from './libs/request'
import NCMBQuery from './libs/query'
import * as crypto from 'crypto';
import fetch from 'node-fetch'

class NCMB {
  applicationKey: string
  clientKey: string
  fqdn: string
  version: string
  applicationKeyName: string
  timestampName: string
  signature!: NCMBSignature
  request!: NCMBRequest

  constructor(applicationKey: string, clientKey: string) {
    this.applicationKey = applicationKey
    this.clientKey = clientKey
    this.fqdn = 'mbaas.api.nifcloud.com'
    this.version = '2013-09-01'
    this.initObjects()
    this.applicationKeyName = 'X-NCMB-Application-Key'
    this.timestampName = 'X-NCMB-Timestamp'
  }

  initObjects() {
    this.signature = new NCMBSignature(this)
    this.request = new NCMBRequest(this)
  }

  Object(name: string): NCMBObject {
    return new NCMBObject(this, name)
  }

  Query(name: string): NCMBQuery {
    return new NCMBQuery(this, name)
  }

  path(className: string, objectId: string|null): string {
    return `/${this.version}/classes/${className}/${objectId || ''}`
  }

  url(className: string, queries:{ [s: string]: any } = {}, objectId: string|null) {
    const query = Object.keys(queries).sort().map(k => `${k}=${encodeURI(JSON.stringify(queries[k]))}`).join('&')
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

  fetch(url: string, options: any): Response {
    return fetch(url, options);
  }
}

export default NCMB
