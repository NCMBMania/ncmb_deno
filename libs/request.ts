/// <reference types="node" />
// @ts-ignore: TS2691
import NCMB from '../ncmb.ts'

class NCMBRequest {
  _ncmb: NCMB

  constructor(ncmb: NCMB) {
    this._ncmb = ncmb
  }
  
  async get(className: string, queries = {}) {
    const result = await this.exec('GET', className, queries)
    return result.results.map((o: { [s: string]: any }) => {
      const obj = this._ncmb.Object(className)
      obj.sets(o)
      return obj
    })
  }
  
  async post(className: string, data = {}) {
    return await this.exec('POST', className, {}, data)
  }
  
  async put(className: string, data = {}, objectId: string) {
    return await this.exec('PUT', className, {}, data, objectId)
  }
  
  data(data: { [s: string]: any } = {}) {
    delete data.createDate
    delete data.updateDate
    delete data.objectId
    return JSON.stringify(data)
  }
  
  async exec(method: string, className: string, queries: { [s: string]: any } = {}, data:{ [s: string]: any } = {}, objectId: string|null = null) {
    const time = (new Date).toISOString()
    const sig = this._ncmb.signature.create(method, time, className, queries, objectId)
    const headers: { [s: string]: any } = {
      'X-NCMB-Signature': sig,
      'Content-Type': 'application/json'
    }
    headers[this._ncmb.applicationKeyName] = this._ncmb.applicationKey
    headers[this._ncmb.timestampName] = time
    
    const res:Response = await this._ncmb.fetch(this._ncmb.url(className, queries, objectId), {
      method: method,
      headers: headers,
      body: ['POST', 'PUT'].indexOf(method) > -1 ? this.data(data) : null
    })
    const json = await res.json()
    if (json.code) throw new Error(json.error)
    return json
  }  
}

export default NCMBRequest
