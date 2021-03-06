import NCMB, { NCMBObject, NCMBQuery, NCMBUser } from '../ncmb.ts';
import { JsonObject, roleJson, roleBaseJson } from "../@types/misc.d.ts";
class NCMBRole extends NCMBObject {
    static ncmb: NCMB;
    public users: NCMBUser[] = [];
    public roles: NCMBRole[] = [];
    constructor() {
        super("roles");
    }
    static query(): NCMBQuery {
        return new NCMBQuery("roles");
    }
    addUser(user: NCMBUser): NCMBRole {
        this.users.push(user);
        return this;
    }
    addRole(role: NCMBRole): NCMBRole {
        this.roles.push(role);
        return this;
    }
    async fetchUser(): Promise<NCMBUser[]> {
        return (await this.fetchRelated("User")) as NCMBUser[];
    }
    async fetchRole(): Promise<NCMBRole[]> {
        return (await this.fetchRelated("Role")) as NCMBRole[];
    }
    async fetchRelated(key: string): Promise<NCMBUser[] | NCMBRole[] | NCMBObject[]> {
        const query = (key === "User" ? NCMBUser : NCMBRole).query();
        return query
            .relatedTo(this, `belong${key}`)
            .fetchAll();
    }
    getObjects(name: string): NCMBUser[] | NCMBRole[] {
        if (name === "User") {
            return this.users;
        }
        else {
            return this.roles;
        }
    }
    convert(name: string): roleBaseJson {
        const json: roleBaseJson = {
            __op: "AddRelation",
            objects: []
        };
        this.getObjects(name).forEach((obj: NCMBUser | NCMBRole) => {
            json.objects!.push({
                __type: "Pointer",
                className: name.toLowerCase(),
                objectId: obj.get("objectId")
            });
        });
        return json;
    }
    toJSON(): object {
        const json = this._fields;
        if (this.users.length > 0)
            json.belongUser = this.convert("User");
        if (this.roles.length > 0)
            json.belongRole = this.convert("Role");
        return json;
    }
    async save(): Promise<NCMBRole> {
        this._fields = this.toJSON();
        return await super.save() as NCMBRole;
    }
}
export default NCMBRole;
