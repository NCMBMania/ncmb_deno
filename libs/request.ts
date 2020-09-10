// @ts-ignore TS2691
import NCMB from '../ncmb.ts'
// @ts-ignore TS2691
import NCMBObject from './object.ts'

class NCMBRequest {
  static ncmb: NCMB
  
  async get(className: string, queries = {}): Promise<NCMBObject[]> {
    const result = await this.exec('GET', className, queries)
    return result.results.map((o: { [s: string]: any }) => {
      const obj = NCMBRequest.ncmb.Object(className)
      obj.sets(o)
      return obj
    })
  }
  
  async post(className: string, data = {}): Promise<{ [s: string]: any }> {
    return await this.exec('POST', className, {}, data)
  }
  
  async put(className: string, data = {}, objectId: string): Promise<{ [s: string]: any }> {
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
    const sig = NCMBRequest.ncmb.signature.create(method, time, className, queries, objectId)
    const headers: { [s: string]: any } = {
      'X-NCMB-Signature': sig,
      'Content-Type': 'application/json'
    }
    headers[NCMBRequest.ncmb.applicationKeyName] = NCMBRequest.ncmb.applicationKey
    headers[NCMBRequest.ncmb.timestampName] = time
    
    const res = await NCMBRequest.ncmb.fetch(NCMBRequest.ncmb.url(className, queries, objectId), {
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
