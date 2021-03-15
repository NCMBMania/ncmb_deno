import NCMB, { NCMBGeoPoint, NCMBObject, NCMBUser, NCMBRole } from '../index';

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
    if(!exist === null) exist = true;
    return this.setOperand(key, exist, '$exists')
  }

  regularExpressionTo(key: string, regex: RegExp): NCMBQuery {
    return this.setOperand(key, regex.toString().slice(1, -1), '$regex')
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

  or(queries: NCMBQuery[]): NCMBQuery {
    if (!this._queries.where) this._queries.where = {}
    if (!Array.isArray(this._queries.where['$or'])) {
      this._queries.where['$or'] = []
    }
    for (const query of queries) {
      this._queries.where['$or'].push(query._queries._where)
    }
    return this
  }

  select(name: string, subKey: string, query: NCMBQuery): NCMBQuery {
    const className = query.getClassName();
    if (!this._queries.where) this._queries.where = {}
    if (!this._queries.where[name]) this._queries.where[name] = {};
    this._queries.where[name]['$select'] = {
      query: query.getSelectParams(),
      key: subKey
    };
    return this;
  }

  inQuery(name: string, query: NCMBQuery): NCMBQuery {
    const className = query.getClassName();
    if (!this._queries.where) this._queries.where = {}
    if (!this._queries.where[name]) this._queries.where[name] = {};
    this._queries.where[name]['$inQuery'] = query.getSelectParams()
    return this;
  }
  
  relatedTo(obj: NCMBObject | NCMBUser | NCMBRole, key: string): NCMBQuery {
    if (!this._queries.where) this._queries.where = {}
    let className: string;
    if (obj instanceof NCMBUser) {
      className = 'user'
    } else if (obj instanceof NCMBRole) {
      className = 'role'
    } else {
      className = obj._name
    }
    this._queries.where['$relatedTo'] = {
      object: {
        __type: 'Pointer',
        className,
        objectId: obj.get('objectId')
      },
      key
    }
    return this;
  }

  getClassName(): string {
    switch (this._className) {
      case 'users':
        return 'user';
      case 'roles':
        return 'role';
      case 'installations':
        return 'installation';
      case 'files':
        return 'file';
      default:
        return this._className;
    }
  }

  getSelectParams(): {[s: string]: any} {
    const params: {[s: string]: any} = {
      className: this._className,
      where: this._queries.where
    };
    if (this._queries._skip && this._queries._skip > 0) params.skip = this._queries._skip;
    if (this._queries._limit && this._queries._limit > 0) params.limit = this._queries._limit;
    return params;
  }

  limit(number: number): NCMBQuery {
    this._queries.limit = number
    return this
  }

  order(key: string, descending: boolean): NCMBQuery {
    const symbol = descending ? `- ${key}` : key;
    if (!this._queries.order) {
      this._queries.order = symbol
    } else {
      this._queries.order = `${this._queries.order}, ${symbol}`
    }
    return this
  }

  skip(num: number): NCMBQuery {
    if (num > 0) {
      this._queries.skip = num
    }
    return this
  }

  include(name: string): NCMBQuery {
    this._queries.include = name
    return this
  }

  async fetchWithCount(): Promise<{count: number, results: NCMBObject[]}> {
    return await NCMBQuery.ncmb.request.getWithCount(this._className, this._queries)
  }

  async fetchAll(): Promise<NCMBObject[]> {
    return await NCMBQuery.ncmb.request.get(this._className, this._queries);
  }

  async fetch(): Promise<NCMBObject|null> {
    return (await this.limit(1).fetchAll())[0]
  }
}

export default NCMBQuery