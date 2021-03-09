import NCMBObject from './libs/object';
import NCMBSignature from './libs/signature';
import NCMBRequest from './libs/request';
import NCMBQuery from './libs/query';
import NCMBInstallation from './libs/installation';
import NCMBUser from './libs/user';
import NCMBAcl from './libs/acl';
import NCMBGeoPoint from './libs/geopoint';
import { Response } from 'node-fetch';
export { NCMBObject, NCMBQuery, NCMBInstallation, NCMBUser, NCMBAcl, NCMBGeoPoint };
export default class NCMB {
    applicationKey: string;
    clientKey: string;
    fqdn: string;
    version: string;
    applicationKeyName: string;
    timestampName: string;
    signature: NCMBSignature;
    request: NCMBRequest;
    sessionToken: string | null;
    sessionTokenHeader: string;
    constructor(applicationKey: string, clientKey: string);
    initObject(this: NCMB): void;
    path(className: string, objectId: string | null): string;
    url(className: string, queries: {
        [s: string]: any;
    }, objectId: string | null): string;
    base64(buffer: ArrayBuffer): string;
    sign(str: string): string;
    uuid(): string;
    fetch(url: string, options: any): Promise<Response>;
}
