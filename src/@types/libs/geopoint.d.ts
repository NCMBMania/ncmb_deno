declare class NCMBGeoPoint {
    latitude: number;
    longitude: number;
    constructor(lat: number, lng: number);
    valid(): void;
    toJSON(): {
        [s: string]: string | number;
    };
}
export default NCMBGeoPoint;
