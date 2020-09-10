// @ts-ignore TS2691
import NCMB from '../ncmb.ts'
// @ts-ignore TS2691
import NCMBObject from './object.ts'

class NCMBQuery {
  static ncmb: NCMB
  _className: string
  _queries: { [s: string]: any }

  constructor(name: string) {
    this._className = name
    this._queries = {}
  }

  where(params: { [s: string]: any }): NCMBQuery {
    this._queries.where = params
    return this
  }

  equalTo(key: string, value:any): NCMBQuery {
    return this.setOperand(key, value)
  }

  setOperand(key: string, value:any, ope: string|null = null): NCMBQuery {
    if (!this._queries.where) {
      this._queries.where = {}
    }
    if (!ope) {
      this._queries.where[key] = value
      return this
    }
    if (!this._queries.where[key]) {
      this._queries.where[key] = {}
    }
    this._queries.where[key][ope] = value
    return this
  }

  limit(number: number): NCMBQuery {
    this._queries.limit = number
    return this
  }

  offset(number: number): NCMBQuery {
    this._queries.offset = number
    return this
  }

  async fetchAll(): Promise<NCMBObject[]> {
    return await NCMBQuery.ncmb.request.get(this._className, this._queries)
  }

  async fetch(): Promise<NCMBObject|null> {
    return (await this.limit(1).fetchAll())[0]
  }
}

export default NCMBQuery