// @ts-ignore TS2691
class NCMBGeoPoint {
  _latitude: number
  _longitude: number
  constructor(lat: number, lng: number) {
    this._latitude = lat
    this._longitude = lng
    this.valid()
  }

  valid(): void {
    if (isNaN(this._latitude) || isNaN(this._longitude)) {
      throw new Error('GeoPoint latitude and longitude should be number')
    }
    if (this._latitude < -90.0) {
      throw new Error(`GeoPoint should not take latitude (${this._latitude}) < -90.0.`)
    }
    if (this._latitude > 90.0) {
      throw new Error(`GeoPoint should not take latitude (${this._latitude}) > 90.0.`)
    }
    if (this._longitude < -180.0) {
      throw new Error(`GeoPoint should not take longitude (${this._longitude}) < -180.0.`);
    }
    if (this._longitude > 180.0) {
      throw new Error(`GeoPoint should not take longitude (${this._longitude}) > 180.0.`);
    }   
  }

  toJSON(): { [s: string]: string | number } {
    return {
      __type:    "GeoPoint",
      latitude:  this._latitude,
      longitude: this._longitude
    }
  }
}

export default NCMBGeoPoint
