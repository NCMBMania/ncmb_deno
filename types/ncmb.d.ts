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
  initObjects(): void
  Object(name: string): NCMBObject
  Query(name: string): NCMBQuery
  path(className: string, objectId: string|null): string
  url(className: string, queries:{ [s: string]: any }, objectId: string|null)
  base64(buffer: ArrayBuffer): string
  sign(str: string): string
  fetch(url: string, options: any): Response
}
