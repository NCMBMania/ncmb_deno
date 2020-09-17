import NCMBInstallation from "../libs/installation"
import NCMBObject from '../libs/object'
import NCMBGeoPoint from '../libs/geopoint'
import NCMBUser from '../libs/user'

declare class NCMBQuery {
  static ncmb: NCMB
  _className: string
  _queries: { [s: string]: any }
  constructor(ncmb: NCMB, name: string)
  where(params: { [s: string]: any }): NCMBQuery
  equalTo(key: string, value:any): NCMBQuery
  setOperand(key: string, value:any, ope: string|null): NCMBQuery
  notEqualTo(key: string, value:any): NCMBQuery
  lessThan(key: string, value: number | Date): NCMBQuery
  lessThanOrEqualTo(key: string, value: number | Date): NCMBQuery
  greaterThan(key: string, value: number | Date): NCMBQuery
  greaterThanOrEqualTo(key: string, value: number | Date): NCMBQuery
  in(key: string, values: any[]): NCMBQuery
  notIn(key: string, values: any[]): NCMBQuery
  exists(key: string, exist: boolean | null): NCMBQuery
  regularExpressionTo(key: string, regex: string): NCMBQuery
  inArray(key: string, values: any): NCMBQuery
  notInArray(key: string, values: any): NCMBQuery
  allInArray(key: string, values: any): NCMBQuery
  near(key: string, location: NCMBGeoPoint): NCMBQuery
  withinKilometers(key: string, location: NCMBGeoPoint, maxDistance: number): NCMBQuery
  withinMiles(key: string, location: NCMBGeoPoint, maxDistance: number): NCMBQuery
  withinRadians(key: string, location: NCMBGeoPoint, maxDistance: number): NCMBQuery
  withinSquare(key: string, southWestVertex: NCMBGeoPoint, northEastVertex: NCMBGeoPoint): NCMBQuery
  limit(number: number): NCMBQuery
  offset(number: number): NCMBQuery
  fetchAll(): Promise<NCMBObject[] | NCMBUser[] | NCMBInstallation[]>
  fetch(): Promise<NCMBObject | NCMBUser | NCMBInstallation | null>
}