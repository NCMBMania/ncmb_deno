import NCMB, { NCMBObject, NCMBQuery } from '../index.ts';
import { authData } from '../../types/misc.d.ts';
declare class NCMBUser extends NCMBObject {
    static ncmb: NCMB;
    _name: string;
    _fields: {
        [s: string]: any;
    };
    constructor();
    static query(): NCMBQuery;
    set(key: string, value: any): NCMBUser;
    sets(obj: {
        [s: string]: any;
    }): NCMBUser;
    delete(): Promise<boolean>;
    get(k: string): any;
    fetch(): Promise<NCMBUser>;
    static key(): string;
    getJson(): {
        [s: string]: any;
    };
    static signUp(userName: string, password: string): Promise<NCMBUser>;
    signUpByAccount(): Promise<boolean>;
    signUpWith(provider: string, auth: authData): Promise<boolean>;
    static requestSignUpEmail(mailAddress: string): Promise<boolean>;
    static requestPasswordReset(mailAddress: string): Promise<boolean>;
    static login(userName: string, password: string): Promise<NCMBUser>;
    static loginWithEmail(mailAddress: string, password: string): Promise<NCMBUser>;
    static loginWith(params: {
        [s: string]: any;
    }): Promise<NCMBUser>;
    static logout(): Promise<void>;
    static loginAsAnonymous(): Promise<NCMBUser | null>;
}
export default NCMBUser;
