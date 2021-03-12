// @ts-ignore TS2691
import NCMB from '../ncmb.ts';
// @ts-ignore TS2691
import NCMBObject from "./object.ts";
// @ts-ignore TS2691
import NCMBAcl from "./acl.ts";
class NCMBRequest {
    static ncmb: NCMB;
    async get(className: string, queries = {}): Promise<NCMBObject[]> {
        const result = await this.exec("GET", className, queries);
        return result.results.map((o: {
            [s: string]: any;
        }) => {
            const obj = new NCMBObject(className);
            obj.sets(o);
            return obj;
        });
    }
    async getWithCount(className: string, queries: {
        [s: string]: any;
    } = {}): Promise<{
        count: number;
        results: NCMBObject[];
    }> {
        queries.count = 1;
        const result = await this.exec("GET", className, queries);
        return {
            count: result.count,
            results: result.results.map((o: {
                [s: string]: any;
            }) => {
                const obj = new NCMBObject(className);
                obj.sets(o);
                return obj;
            })
        };
    }
    async post(className: string, data = {}): Promise<{
        [s: string]: any;
    }> {
        return await this.exec("POST", className, {}, data);
    }
    async put(className: string, data = {}, objectId: string): Promise<{
        [s: string]: any;
    }> {
        return await this.exec("PUT", className, {}, data, objectId);
    }
    async delete(className: string, objectId: string): Promise<boolean> {
        const res = await this.exec("DELETE", className, {}, {}, objectId);
        return Object.keys(res).length === 0;
    }
    data(params: {
        [s: string]: any;
    } = {}) {
        const data = { ...params };
        delete data.createDate;
        delete data.updateDate;
        delete data.objectId;
        for (const key in data) {
            const value = data[key];
            if (value instanceof Date) {
                data[key] = {
                    __type: "Date",
                    iso: (<Date>value).toISOString()
                };
            }
        }
        return JSON.stringify(data);
    }
    async exec(method: string, className: string, queries: {
        [s: string]: any;
    } = {}, data: {
        [s: string]: any;
    } = {}, objectId: string | null = null): Promise<{
        [s: string]: any;
    }> {
        const time = (new Date).toISOString();
        const sig = NCMBRequest.ncmb.signature.create(method, time, className, queries, objectId);
        const headers: {
            [s: string]: any;
        } = {
            "X-NCMB-Signature": sig,
            "Content-Type": "application/json"
        };
        headers[NCMBRequest.ncmb.applicationKeyName] = NCMBRequest.ncmb.applicationKey;
        headers[NCMBRequest.ncmb.timestampName] = time;
        if (NCMBRequest.ncmb.sessionToken) {
            headers[NCMBRequest.ncmb.sessionTokenHeader] = NCMBRequest.ncmb.sessionToken;
        }
        const res = await NCMBRequest.ncmb.fetch(NCMBRequest.ncmb.url(className, queries, objectId), {
            method: method,
            headers: headers,
            body: ["POST", "PUT"].indexOf(method) > -1 ? this.data(data) : null
        });
        const text = await res.text();
        if (method === "DELETE" && text === "") {
            return {};
        }
        const json = JSON.parse(text);
        if (json.code) {
            console.log(NCMBRequest.ncmb.url(className, queries, objectId));
            console.log(headers);
            throw new Error(json.error);
        }
        return json;
    }
}
export default NCMBRequest;
