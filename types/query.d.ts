declare class NCMBQuery {
  _ncmb: NCMB
  _className: string
  _queries: { [s: string]: any }
  constructor(ncmb: NCMB, name: string)
  where(params: { [s: string]: any }): NCMBQuery
  equalTo(key: string, value:any): NCMBQuery
  setOperand(key: string, value:any, ope: string|null): NCMBQuery
  limit(number: number): NCMBQuery
  offset(number: number): NCMBQuery
  fetchAll(): Promise<NCMBObject[]>
  fetch(): Promise<NCMBObject|null>
}