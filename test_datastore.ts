import NCMB, { NCMBObject, NCMBAcl, NCMBQuery, NCMBUser, NCMBGeoPoint } from './ncmb.ts'
import { readJson } from 'https://deno.land/std/fs/read_json.ts'
const config = await readJson('./config.json') as { [s: string]: string }
const applicationKey = config.applicationKey
const clientKey = config.clientKey

new NCMB(applicationKey, clientKey)
const hello = new NCMBObject('HelloDeno')

await hello
  .set('message', 'Hello world')
  .set('number', 100)
  .set('date', new Date)
  .save()
await hello
  .set('number', 200)
  .save()
const acl = new NCMBAcl()
acl
  .setPublicReadAccess(true)
  .setPublicWriteAccess(true)
const geo = new NCMBGeoPoint(35.0, 100.0);
const hello2 = new NCMBObject('HelloDeno')
await hello2
  .set('message', 'Hello world')
  .set('number', 100)
  .set('acl', acl) 
  .set('hello1', hello)
  .set('geo', geo)
  .save()
console.log(hello.get('objectId'))
await hello.delete()
const user = await NCMBUser.login('tester', 'tester')


const query = new NCMBQuery('HelloDeno')
query.equalTo('objectId', 'DPnmQfMGTMuSS44Q')
query.limit(1)
const results = await query.fetchAll()
console.log(results)

const user2 = await NCMBUser.signUp('tester2', 'tester')
console.log(user2.get('objectId'))
await user2.delete()
await NCMBUser.logout()
const d = new NCMBObject('HelloDeno')
await d.set('objectId', 'DPnmQfMGTMuSS44Q').fetch()
console.log(d)