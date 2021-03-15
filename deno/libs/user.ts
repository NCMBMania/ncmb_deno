import NCMB, { NCMBObject, NCMBQuery } from '../ncmb.ts';
import { authData } from "../@types/misc.d.ts";
class NCMBUser extends NCMBObject {
    static ncmb: NCMB;
    _name: string = "users";
    _fields: {
        [s: string]: any;
    } = {};
    constructor() {
        super("users");
    }
    static query(): NCMBQuery {
        return new NCMBQuery("users");
    }
    static key(): string {
        return `NCMB/${NCMBUser.ncmb.applicationKey}/currentUser`;
    }
    getJson(): {
        [s: string]: any;
    } {
        return { ...this._fields, ...{ sessionToken: NCMBUser.ncmb.sessionToken } };
    }
    static async signUp(userName: string, password: string): Promise<NCMBUser> {
        const json = await NCMBUser.ncmb.request.exec("POST", "/users", {}, { userName, password }) as {
            [s: string]: any;
        };
        const user = new NCMBUser();
        NCMBUser.ncmb.sessionToken = json.sessionToken;
        delete json.sessionToken;
        user.sets(json);
        return user;
    }
    async signUpByAccount(): Promise<boolean> {
        const json = await NCMBUser.ncmb.request.exec("POST", "/users", {}, this._fields) as {
            [s: string]: any;
        };
        NCMBUser.ncmb.sessionToken = json.sessionToken;
        delete json.sessionToken;
        this.sets(json);
        return true;
    }
    static async signUpWith(provider: string, auth: authData): Promise<NCMBUser> {
        if (auth.expires) {
            const expireDate = new Date(auth.expires + (new Date()).getTime()).toJSON();
            auth.expiration_date = {
                __type: "Date",
                iso: expireDate
            };
            delete auth.expires;
        }
        const fields: {
            authData: {
                [s: string]: authData;
            };
        } = { authData: {} };
        fields.authData[provider] = auth;
        const json = await NCMBUser.ncmb.request.exec("POST", "/users", {}, fields) as {
            [s: string]: any;
        };
        const user = new NCMBUser();
        NCMBUser.ncmb.sessionToken = json.sessionToken;
        delete json.sessionToken;
        user.sets(json);
        return user;
    }
    static async requestSignUpEmail(mailAddress: string): Promise<boolean> {
        try {
            const json = await NCMBUser.ncmb.request.exec("POST", "/requestMailAddressUserEntry", {}, { mailAddress });
            return true;
        }
        catch (err) {
            return false;
        }
    }
    static async requestPasswordReset(mailAddress: string): Promise<boolean> {
        try {
            const json = await NCMBUser.ncmb.request.exec("POST", "/requestPasswordReset", {}, { mailAddress });
            return true;
        }
        catch (err) {
            return false;
        }
    }
    static async login(userName: string, password: string): Promise<NCMBUser> {
        return this.loginWith({ userName, password });
    }
    static async loginWithEmail(mailAddress: string, password: string): Promise<NCMBUser> {
        return this.loginWith({ mailAddress, password });
    }
    static async loginWith(params: {
        [s: string]: any;
    }): Promise<NCMBUser> {
        const json = await NCMBUser.ncmb.request.exec("GET", "/login", params) as {
            [s: string]: any;
        };
        const user = new NCMBUser();
        NCMBUser.ncmb.sessionToken = json.sessionToken;
        delete json.sessionToken;
        user.sets(json);
        return user;
    }
    static logout(): void {
        /*
        try {
          await NCMBUser.ncmb.request.exec('GET', '/logout', {});
        } catch (err) {
        }
        */
        NCMBUser.ncmb.sessionToken = null;
    }
    static async loginAsAnonymous(): Promise<NCMBUser | null> {
        const uuid = NCMBUser.ncmb.uuid();
        const user = NCMBUser.signUpWith("anonymous", { id: uuid });
        return user;
    }
}
export default NCMBUser;
