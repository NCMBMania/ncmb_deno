/// <reference path="./request.d.ts"/>
/// <reference path="./query.d.ts"/>
/// <reference path="./object.d.ts"/>
/// <reference path="./signature.d.ts"/>
declare class NCMB {
  applicationKey: string
  clientKey: string
  fqdn: string
  version: string
  applicationKeyName: string
  timestampName: string
  signature: NCMBSignature
  request: NCMBRequest
  constructor(applicationKey: string, clientKey: string)
  initObject(ncmb: NCMB): void
  Object(name: string): NCMBObject
  Query(name: string): NCMBQuery
  path(className: string, objectId: string|null): string
  url(className: string, queries:{ [s: string]: any }, objectId: string|null): string
  base64(buffer: ArrayBuffer): string
  sign(str: string): string
  fetch(url: string, options: any): Promise<Response>
}
