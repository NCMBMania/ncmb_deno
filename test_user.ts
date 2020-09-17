import { NCMB, NCMBUser } from './ncmb.ts'
import { readJson } from 'https://deno.land/std/fs/read_json.ts'
const config = await readJson('./config.json') as { [s: string]: string }
const applicationKey = config.applicationKey
const clientKey = config.clientKey

const ncmb = new NCMB(applicationKey, clientKey)

const user = await NCMBUser.login('tester', 'tester')
console.log(user)
