import { NCMB, NCMBUser } from './ncmb.ts'
import { readJson } from 'https://deno.land/std/fs/read_json.ts'
const config = await readJson('./config.json') as { [s: string]: string }
const applicationKey = config.applicationKey
const clientKey = config.clientKey

const ncmb = new NCMB(applicationKey, clientKey)

const user = await NCMBUser.login('tester', 'tester')
console.log(user)

const anony = await NCMBUser.loginAsAnonymous()
console.log(anony)

const signUpUser = await NCMBUser.signUp('tester3', 'tester3')
console.log(signUpUser.get('objectId'));
await signUpUser.delete();

await NCMBUser.logout()

await NCMBUser.requestSignUpEmail('tester4@moongift.jp')
const mailAddress = 'tester3@moongift.jp'
const password = '7CbdL6@nVbMQCKF'

await NCMBUser.logout()
const emailLogin = await NCMBUser.loginWithEmail(mailAddress, password)
console.log(emailLogin)


await NCMBUser.requestPasswordReset(mailAddress)

const u = new NCMBUser;
u.set('objectId', '7iEjQO7b4DFQXn0R')
await u.fetch()
console.log(u)
