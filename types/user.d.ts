import { NCMBObject } from "./object";

declare class NCMBUser extends NCMBObject {
  login(userName: string, password: string): NCMBUser
}
