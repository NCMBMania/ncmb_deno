declare class NCMBRequest {
  static ncmb: NCMB
  constructor(ncmb: NCMB)
  get(className: string, queries: { [s: string]: any }): Promise<NCMBObject[]>
  post(className: string, data: { [s: string]: any }): Promise<{ [s: string]: any }>
  put(className: string, data: { [s: string]: any }, objectId: string): Promise<{ [s: string]: any }>
  data(data: { [s: string]: any }): { [s: string]: any }
  exec(method: string, className: string, queries: { [s: string]: any }, data:{ [s: string]: any }, objectId: string|null): { [s: string]: any }
}
