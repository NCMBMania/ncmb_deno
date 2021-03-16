import NCMB, { NCMBQuery, NCMBObject, NCMBAcl, NCMBRequest } from '../ncmb.ts';

import { JsonObject } from '../@types/misc.d.ts';
import { Buffer } from "../ncmb.ts";
class NCMBFile extends NCMBObject {
    static ncmb: NCMB;
    constructor() {
        super("files");
    }
    static query(): NCMBQuery {
        return new NCMBQuery("files");
    }
    static async upload(fileName: string, fileData: string | Buffer | Blob, acl?: NCMBAcl, contentType?: string | null): Promise<NCMBFile> {
        const r = new NCMBRequest;
        try {
            const form = new FormData();
            contentType = contentType || "application/octet-stream";
            if (typeof fileData === "string") {
                form.append("file", fileData, contentType);
            }
            else {
                form.append("file", fileData as Blob, NCMBFile.ncmb.contentType(contentType));
            }
            form.append("acl", JSON.stringify((acl || new NCMBAcl).toJSON()));
            const json = await r.exec("POST", "files", {}, form, fileName);
            const file = new NCMBFile;
            return file.sets(json) as NCMBFile;
        }
        catch (e) {
            throw e;
        }
    }
    async download(fileType: string = "text"): Promise<any> {
        const r = new NCMBRequest;
        const response = await r.exec("GET", "files", {}, {}, this._fields.fileName, false);
        if (response.status > 400) {
            const json: JsonObject = await response.json();
            if (json.code) {
                // エラー
                throw new Error(`${json.code}: ${json.error}`);
            }
            else {
                throw new Error(`Server error ${response.status}`);
            }
        }
        switch (fileType.toUpperCase()) {
            case "TEXT":
                return await response.text();
            case "BINARY":
                return await response.blob();
        }
    }
    private getDataUri(blob: Blob) {
        return new Promise((res, _) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                res(reader.result);
            };
            reader.readAsDataURL(blob);
        });
    }
    static path(fileName: string): string {
        return `/${NCMBFile.ncmb.version}/files/${fileName}`;
    }
    path(): string {
        return `/${NCMBFile.ncmb.version}/files/${this.get("fileName")}`;
    }
}
export default NCMBFile;
