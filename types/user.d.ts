import { NCMBObject } from "./object";

declare class NCMBUser extends NCMBObject {
  static login(userName: string, password: string): Promise<NCMBUser>
  static signUp(userName: string, password: string): Promise<NCMBUser>
}
