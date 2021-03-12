import NCMB, { NCMBObject, NCMBPush, NCMBAcl, NCMBQuery, NCMBUser, NCMBGeoPoint } from './ncmb.ts'
import { readJson } from 'https://deno.land/std/fs/read_json.ts'
const config = await readJson('./config.json') as { [s: string]: string }
const applicationKey = config.applicationKey
const clientKey = config.clientKey

new NCMB(applicationKey, clientKey)

const push = new NCMBPush();
await push
  .set('immediateDeliveryFlag', true)
  .set('target', ['ios'])
  .save();

console.log(push.get('objectId'));


