// @ts-ignore TS2691
class NCMBGeoPoint {
  public latitude: number
  public longitude: number
  constructor(lat: number, lng: number) {
    this.latitude = lat
    this.longitude = lng
    this.valid()
  }

  valid(): void {
    if (isNaN(this.latitude) || isNaN(this.longitude)) {
      throw new Error('GeoPoint latitude and longitude should be number')
    }
    if (this.latitude < -90.0) {
      throw new Error(`GeoPoint should not take latitude (${this.latitude}) < -90.0.`)
    }
    if (this.latitude > 90.0) {
      throw new Error(`GeoPoint should not take latitude (${this.latitude}) > 90.0.`)
    }
    if (this.longitude < -180.0) {
      throw new Error(`GeoPoint should not take longitude (${this.longitude}) < -180.0.`);
    }
    if (this.longitude > 180.0) {
      throw new Error(`GeoPoint should not take longitude (${this.longitude}) > 180.0.`);
    }   
  }

  toJSON(): { [s: string]: string | number } {
    return {
      __type:    "GeoPoint",
      latitude:  this.latitude,
      longitude: this.longitude
    }
  }
}

export default NCMBGeoPoint
