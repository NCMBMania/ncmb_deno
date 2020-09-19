import { NCMB, NCMBInstallation } from './ncmb.ts'
import { readJson } from 'https://deno.land/std/fs/read_json.ts'
const config = await readJson('./config.json') as { [s: string]: string }
const applicationKey = config.applicationKey
const clientKey = config.clientKey

const ncmb = new NCMB(applicationKey, clientKey)
const installation = new NCMBInstallation

await installation
  .set('deviceToken', 'aaaa')
  .set('deviceType', 'android')
  .save();
console.log(installation.get('objectId'))

await installation
  .set('deviceToken', 'bbbb')
  .save();


installation.delete()