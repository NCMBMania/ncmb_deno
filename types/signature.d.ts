declare class NCMBSignature {
  _ncmb: NCMB
  _signatureMethodName: string
  _signatureMethodValue: string
  _signatureVersionName: string
  _signatureVersionValue: string
  constructor(ncmb: NCMB)
  create(method: string, time: string, className: string, queries:{ [s: string]: any }, objectId: string|null): string
}
