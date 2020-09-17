import { NCMB, NCMBObject, NCMBAcl, NCMBQuery, NCMBUser } from './ncmb.ts'
import { readJson } from 'https://deno.land/std/fs/read_json.ts'
const config = await readJson('./config.json') as { [s: string]: string }
const applicationKey = config.applicationKey
const clientKey = config.clientKey

const ncmb = new NCMB(applicationKey, clientKey)
const hello = new NCMBObject('HelloDeno')

await hello
  .set('message', 'Hello world')
  .set('number', 100)
  .save()
  console.log(hello.get('objectId'))

await hello
  .set('number', 200)
  .save()

console.log(hello.get('number'))
const acl = new NCMBAcl()
acl
  .setPublicReadAccess(true)
  .setPublicWriteAccess(false)
const hello2 = new NCMBObject('HelloDeno')
await hello2
  .set('message', 'Hello world')
  .set('number', 100)
  .set('acl', acl) 
  .save()
console.log(hello.get('objectId'))

const user = await NCMBUser.login('tester', 'tester')


const query = new NCMBQuery('HelloDeno')
query.equalTo('objectId', 'ypk03ZHeJxjSnSM1')
query.limit(1)
const results = await query.fetchAll()
console.log(results)
