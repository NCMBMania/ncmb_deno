import NCMBObject from './libs/object.ts'
import NCMBSignature from './libs/signature.ts'
import NCMBRequest from './libs/request.ts'
import NCMBQuery from './libs/query.ts'
import NCMBInstallation from './libs/installation.ts'
import NCMBUser from './libs/user.ts'
import NCMBAcl from './libs/acl.ts'
import NCMBGeoPoint from './libs/geopoint.ts'
import NCMBPush from './libs/push.ts'
import NCMBRole from './libs/role.ts'
import NCMBRelation from './libs/relation.ts'
import NCMBFile from './libs/file.ts'

import { HmacSha256 } from "https://deno.land/std/hash/sha256.ts"
import * as base64 from "https://denopkg.com/chiefbiiko/base64/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import Buffer from "https://deno.land/std@0.76.0/node/buffer.ts";

export { NCMBObject, NCMBQuery, NCMBInstallation, NCMBUser, NCMBAcl, NCMBGeoPoint, NCMBPush, NCMBRequest, NCMBRole, NCMBRelation, NCMBFile, Buffer}

export default class NCMB {
  applicationKey: string
  clientKey: string
  fqdn: string
  version: string
  applicationKeyName: string
  timestampName: string
  signature: NCMBSignature
  request: NCMBRequest
  sessionToken: string | null = null
  sessionTokenHeader: string

  constructor(applicationKey: string, clientKey: string) {
    this.applicationKey = applicationKey
    this.clientKey = clientKey
    this.fqdn = 'mbaas.api.nifcloud.com'
    this.version = '2013-09-01'
    this.signature = new NCMBSignature
    this.applicationKeyName = 'X-NCMB-Application-Key'
    this.timestampName = 'X-NCMB-Timestamp'
    this.sessionTokenHeader = 'X-NCMB-Apps-Session-Token'
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
    NCMBPush.ncmb = this
    NCMBRole.ncmb = this
    NCMBFile.ncmb = this
  }

  path(className: string, objectId: string|null): string {
    if (className.indexOf('/') === 0) {
      return `/${this.version}${className}/${objectId || ''}`;
    }
    if (['installations', 'users', 'files', 'push', 'roles'].indexOf(className) > -1) {
      return `/${this.version}/${className}/${objectId || ''}`;
    }
    return `/${this.version}/classes/${className}/${objectId || ''}`;
  }

  contentType(contentType: string): string {
    return contentType
  }

  url(className: string, queries:{ [s: string]: any } = {}, objectId: string|null) {
    const query = Object.keys(queries).sort().map(k => {
      const val = typeof queries[k] === 'object' ? JSON.stringify(queries[k]) : queries[k]
      return `${k}=${encodeURI(val)}`
    }).join('&');
    return `https://${this.fqdn}${this.path(className, objectId)}${query ? '?' + query : ''}`;
  }

  sign(str: string) : string {
    const hmac = new HmacSha256(this.clientKey);
    return this.base64(hmac.update(str).digest());
  }

  uuid(): string {
    return v4.generate()
  }

  base64(bytes: number[]): string {
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

  fetch(url: string, options: any): Promise<Response> {
    return fetch(url, options)
  }


}
