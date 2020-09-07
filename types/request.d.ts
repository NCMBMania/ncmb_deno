declare class NCMBRequest {
  _ncmb: NCMB
  constructor(ncmb: NCMB)
  get(className: string, queries: { [s: string]: any }): { [s: string]: any }
  post(className: string, data: { [s: string]: any }): { [s: string]: any }
  put(className: string, data: { [s: string]: any }, objectId: string): { [s: string]: any }
  data(data: { [s: string]: any }): { [s: string]: any }
  exec(method: string, className: string, queries: { [s: string]: any }, data:{ [s: string]: any }, objectId: string|null): { [s: string]: any }
}
