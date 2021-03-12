import NCMB from "../ncmb.ts";
declare class NCMBSignature {
    static ncmb: NCMB;
    _signatureMethodName: string;
    _signatureMethodValue: string;
    _signatureVersionName: string;
    _signatureVersionValue: string;
    constructor();
    create(method: string, time: string, className: string, q?: {
        [s: string]: any;
    }, objectId?: string | null): string;
}
export default NCMBSignature;
