import NCMB, { NCMBInstallation, NCMBPush, NCMBRole, NCMBAcl, NCMBObject, NCMBUser, NCMBFile } from '../index'
import * as FormData from 'form-data'

class NCMBRequest {
  static ncmb: NCMB
  
  async get(className: string, queries = {}): Promise<NCMBObject[]> {
    const result = await this.exec('GET', className, queries) as {[s: string]: any}
    return result.results.map((o: { [s: string]: any }) => {
      const obj = this.getObject(className)
      obj.sets(o)
      return obj
    })
  }

  getObject(className: string): NCMBObject | NCMBRole | NCMBUser {
    if (className === 'roles') return new NCMBRole()
    if (className === 'users') return new NCMBUser()
    if (className === 'installations') return new NCMBInstallation()
    if (className === 'files') return new NCMBFile()
    // if (className === 'files')
    if (className === 'push') return new NCMBPush()
    return new NCMBObject(className)
  }

  async getWithCount(className: string, queries: {[s: string]: any} = {}): Promise<{count: number, results: NCMBObject[]}> {
    queries.count = 1
    const result = await this.exec('GET', className, queries) as {[s: string]: any}
    return {
      count: result.count,
      results: result.results.map((o: { [s: string]: any }) => {
        const obj = new NCMBObject(className)
        obj.sets(o);
        return obj;
      })
    };
  }
  
  async post(className: string, data: object | FormData = {}): Promise<{ [s: string]: any }> {
    return await this.exec('POST', className, {}, data) as { [s: string]: any }
  }
  
  async put(className: string, data = {}, objectId: string): Promise<{ [s: string]: any }> {
    return await this.exec('PUT', className, {}, data, objectId) as { [s: string]: any }
  }

  async delete(className: string, objectId: string): Promise<boolean> {
    const res = await this.exec('DELETE', className, {}, {}, objectId)
    return Object.keys(res).length === 0
  }
  
  data(params: { [s: string]: any } | FormData): string | FormData {
    if (params instanceof FormData) return params
    const data = {...params}
    delete data.createDate
    delete data.updateDate
    delete data.objectId
    for (const key in data) {
      const value = data[key]
      if (value instanceof Date) {
        data[key] = {
          __type: 'Date',
          iso: (<Date> value).toISOString()
        }
      }
      if (value && value.toJSON) {
        data[key] = value.toJSON()
      }
    }
    return JSON.stringify(data)
  }
  
  async exec(
    method: string,
    className: string,
    queries: { [s: string]: any } = {},
    data:{ [s: string]: any } | FormData = {},
    objectId: string|null = null,
    parse: boolean = true
    ): Promise<{ [s: string]: any } | Response> {
    const time = (new Date).toISOString()
    const sig = NCMBRequest.ncmb.signature.create(method, time, className, queries, objectId)
    const headers: { [s: string]: any } = {
      'X-NCMB-Signature': sig,
    }
    if (!(data instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }
    headers[NCMBRequest.ncmb.applicationKeyName] = NCMBRequest.ncmb.applicationKey
    headers[NCMBRequest.ncmb.timestampName] = time
    if (NCMBRequest.ncmb.sessionToken) {
      headers[NCMBRequest.ncmb.sessionTokenHeader] = NCMBRequest.ncmb.sessionToken
    }
    const url = NCMBRequest.ncmb.url(className, queries, objectId)
    const body = ['POST', 'PUT'].indexOf(method) > -1 ? this.data(data) : null
    const res = await NCMBRequest.ncmb.fetch(url, {
      method,
      headers,
      body,
    })
    if (!parse) return res
    const text = await res.text();
    if (method === 'DELETE' && text === '') {
      return {}
    }
    const json = JSON.parse(text)
    if (json.code) {
      console.error(`${method} ${url}`)
      console.error(body)
      console.error(headers)
      console.error(json)
      throw new Error(json.error)
    }
    return json
  }  
}

export default NCMBRequest
