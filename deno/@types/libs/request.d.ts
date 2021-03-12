import NCMB from "../ncmb.ts";
import NCMBObject from "./object.ts";
declare class NCMBRequest {
    static ncmb: NCMB;
    get(className: string, queries?: {}): Promise<NCMBObject[]>;
    getWithCount(className: string, queries?: {
        [s: string]: any;
    }): Promise<{
        count: number;
        results: NCMBObject[];
    }>;
    post(className: string, data?: {}): Promise<{
        [s: string]: any;
    }>;
    put(className: string, data: {}, objectId: string): Promise<{
        [s: string]: any;
    }>;
    delete(className: string, objectId: string): Promise<boolean>;
    data(params?: {
        [s: string]: any;
    }): string;
    exec(method: string, className: string, queries?: {
        [s: string]: any;
    }, data?: {
        [s: string]: any;
    }, objectId?: string | null): Promise<{
        [s: string]: any;
    }>;
}
export default NCMBRequest;
