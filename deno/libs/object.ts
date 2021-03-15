import NCMB, { NCMBAcl, NCMBInstallation, NCMBUser, NCMBQuery, NCMBPush, NCMBRole, NCMBFile } from '../ncmb.ts';
import { NCMBPointer } from '../@types/misc.d.ts';
class NCMBObject {
    static ncmb: NCMB;
    public _name: string;
    public _fields: {
        [s: string]: any;
    };
    public _required: string[];
    constructor(name: string) {
        this._name = name;
        this._fields = {};
        this._required = [];
    }
    sets(obj: {
        [s: string]: any;
    }): NCMBObject | NCMBInstallation | NCMBUser {
        for (let key in obj) {
            if (["className", "__type"].indexOf(key) > -1)
                continue;
            this.set(key, obj[key]);
        }
        return this;
    }
    set(key: string, value: any): NCMBObject | NCMBInstallation | NCMBUser | NCMBPush {
        if (["createDate", "updateDate"].indexOf(key) > -1) {
            this._fields[key] = new Date(value);
        }
        else if (value && value.__type === "Date" && value.iso) {
            this._fields[key] = new Date(value.iso);
        }
        else if (value && value.__type === "Object") {
            const o = new NCMBObject(value.className);
            o.sets(value);
            this._fields[key] = o;
        }
        else if (key === "acl") {
            const a = new NCMBAcl();
            a.sets(value);
            this._fields[key] = a;
        }
        else {
            this._fields[key] = value;
        }
        return this;
    }
    get(k: string): any {
        return this._fields[k];
    }
    add(k: string, value: any): NCMBObject | NCMBInstallation | NCMBUser {
        return this.addOrRemove(k, value, "Add");
    }
    addUnique(k: string, value: any): NCMBObject | NCMBInstallation | NCMBUser {
        return this.addOrRemove(k, value, "AddUnique");
    }
    remove(k: string, value: any): NCMBObject | NCMBInstallation | NCMBUser {
        return this.addOrRemove(k, value, "Remove");
    }
    addOrRemove(k: string, objects: any, __op: string) {
        if (!Array.isArray(objects)) {
            objects = [objects];
        }
        if (this._fields["objectId"]) {
            if (this._fields[k] && this._fields[k].objects) {
                for (const obj of objects) {
                    this._fields[k].objects.push(obj);
                }
            }
            else {
                this._fields[k] = { __op, objects };
            }
        }
        else {
            this._fields[k] = objects;
        }
        return this;
    }
    setIncrement(name: string, value: number): NCMBObject | NCMBUser | NCMBInstallation {
        if (!this.get("objectId")) {
            return this.set(name, value);
        }
        return this.set(name, {
            __op: "Increment",
            amount: value
        });
    }
    getJson(): {
        [s: string]: any;
    } {
        return { ...this._fields, ...{ sessionToken: NCMBObject.ncmb.sessionToken } };
    }
    async save(): Promise<NCMBObject | NCMBInstallation | NCMBUser | NCMBPush | NCMBRole> {
        for (const key of this._required) {
            const value = this.get(key);
            if (!value || value === "") {
                throw new Error(`${key} is required.`);
            }
        }
        const method = this._fields.objectId ? "put" : "post";
        const json = await NCMBObject.ncmb.request[method](this._name, this._fields, this._fields.objectId);
        this.sets(json);
        return this;
    }
    async fetch(ncmb?: NCMB): Promise<NCMBObject | NCMBUser | NCMBInstallation> {
        const json = await (ncmb || NCMBObject.ncmb).request.exec("GET", this._name, {}, {}, this._fields.objectId);
        this.sets(json);
        return this;
    }
    async delete(ncmb?: NCMB): Promise<boolean> {
        const key = (this instanceof NCMBFile) ? this._fields.fileName : this._fields.objectId;
        return await (ncmb || NCMBObject.ncmb).request.delete(this._name, key);
    }
    toPointer(): NCMBPointer {
        return {
            "__type": "Pointer",
            "className": this._name,
            "objectId": this.get("objectId")
        };
    }
    toJSON(): object {
        if (!this.get("objectId")) {
            throw new Error("Save object data before add themselve as Pointer.");
        }
        return {
            __type: "Pointer",
            objectId: this.get("objectId"),
            className: this._name
        };
    }
}
export default NCMBObject;
