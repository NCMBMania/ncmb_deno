// @ts-ignore TS2691
import NCMB from '../ncmb.ts'
// @ts-ignore TS2691
import NCMBGeoPoint from './geopoint.ts'
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

  reset(): NCMBQuery {
    this._queries = {}
    return this;
  }

  where(params: { [s: string]: any }): NCMBQuery {
    this._queries.where = params
    return this
  }

  equalTo(key: string, value:any): NCMBQuery {
    return this.setOperand(key, value)
  }

  notEqualTo(key: string, value:any): NCMBQuery {
    return this.setOperand(key, value, '$ne')
  }

  lessThan(key: string, value: number | Date): NCMBQuery {
    return this.setOperand(key, value, '$lt')
  }

  lessThanOrEqualTo(key: string, value: number | Date): NCMBQuery {
    return this.setOperand(key, value, '$lte')
  }

  greaterThan(key: string, value: number | Date): NCMBQuery {
    return this.setOperand(key, value, '$gt')
  }

  greaterThanOrEqualTo(key: string, value: number | Date): NCMBQuery {
    return this.setOperand(key, value, '$gte')
  }

  in(key: string, values: any[]): NCMBQuery {
    return this.setOperand(key, values, '$in')
  }

  notIn(key: string, values: any[]): NCMBQuery {
    return this.setOperand(key, values, '$nin')
  }

  exists(key: string, exist: boolean | null = null): NCMBQuery {
    if(!exist) exist = true
    return this.setOperand(key, exist, '$exists')
  }

  regularExpressionTo(key: string, regex: string): NCMBQuery {
    return this.setOperand(key, regex, '$regex')
  }
  
  inArray(key: string, values: any): NCMBQuery {
    if(!Array.isArray(values)) values = [values]
    return this.setOperand(key, values, '$inArray')
  }

  notInArray(key: string, values: any): NCMBQuery {
    if(!Array.isArray(values)) values = [values]
    return this.setOperand(key, values, '$ninArray')
  }

  allInArray(key: string, values: any): NCMBQuery {
    if(!Array.isArray(values)) values = [values]
    return this.setOperand(key, values, '$all')
  }

  near(key: string, location: NCMBGeoPoint): NCMBQuery {
    return this.setOperand(key, location.toJSON(), '$nearSphere')
  }

  withinKilometers(key: string, location: NCMBGeoPoint, maxDistance: number): NCMBQuery {
    this.setOperand(key, maxDistance, '$maxDistanceInKilometers')
    this.setOperand(key, location.toJSON(), '$nearSphere')
    return this
  }

  withinMiles(key: string, location: NCMBGeoPoint, maxDistance: number): NCMBQuery {
    this.setOperand(key, maxDistance, '$maxDistanceInMiles')
    this.setOperand(key, location.toJSON(), '$nearSphere')
    return this
  }

  withinRadians(key: string, location: NCMBGeoPoint, maxDistance: number): NCMBQuery {
    this.setOperand(key, maxDistance, '$maxDistanceInRadians')
    this.setOperand(key, location.toJSON(), '$nearSphere')
    return this
  }

  withinSquare(key: string, southWestVertex: NCMBGeoPoint, northEastVertex: NCMBGeoPoint): NCMBQuery {
    var box = {
      '$box':[
        southWestVertex.toJSON(),
        northEastVertex.toJSON()
      ]
    }
    return this.setOperand(key, box, '$within')
  }

  setOperand(key: string, value:any, ope: string|null = null): NCMBQuery {
    if (value instanceof Date) {
      value = {
        __type: 'Date',
        iso: (<Date> value).toISOString()
      }
    }
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