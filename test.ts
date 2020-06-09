import NCMB from './ncmb.ts'
import { readJson } from 'https://deno.land/std/fs/read_json.ts'
const config = await readJson('./config.json') as { [s: string]: string }
const applicationKey = config.applicationKey
const clientKey = config.clientKey

const ncmb = new NCMB(applicationKey, clientKey)

const hello = ncmb.Object('HelloDeno')

await hello
  .set('message', 'Hello world')
  .set('number', 100)
  .save()
console.log(hello.get('objectId'))
