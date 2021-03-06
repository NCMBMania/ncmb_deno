import NCMB, { NCMBObject, NCMBAcl, NCMBQuery, NCMBUser, NCMBGeoPoint } from './deno/ncmb.ts'
import { readJson } from 'https://deno.land/std@0.66.0/fs/read_json.ts'
const config = await readJson('./config.json') as { [s: string]: string }
const applicationKey = config.applicationKey
const clientKey = config.clientKey

new NCMB(applicationKey, clientKey);

(async () => {
  const query = new NCMBQuery('QueryTest');
  const results = await query.equalTo('string', 'Hello').fetchAll()
  console.log('equalTo', results.length, results[0].get('objectId'))
})();

(async () => {
  const query = new NCMBQuery('QueryTest');
  const results = await query.notEqualTo('string', 'Hello').fetchAll()
  console.log('notEqualTo', results.length, results[0].get('objectId'))
})();

(async () => {
  const query = new NCMBQuery('QueryTest');
  const results = await query.lessThan('number', 200).fetchAll()
  console.log('lessThan', results.length, results[0].get('objectId'))
})();

(async () => {
  const query = new NCMBQuery('QueryTest');
  const results = await query.lessThanOrEqualTo('number', 200).fetchAll()
  console.log('lessThanOrEqualTo', results.length, results[0].get('objectId'))
})();

(async () => {
  const query = new NCMBQuery('QueryTest');
  const results = await query.lessThanOrEqualTo('date', new Date(2020, 8, 16, 9, 0, 0)).fetchAll()
  console.log('lessThanOrEqualTo (date)', results.length, results[0].get('objectId'))
})();

(async () => {
  const query = new NCMBQuery('QueryTest');
  const results = await query.lessThan('date', new Date(2020, 8, 16, 9, 0, 0)).fetchAll()
  console.log('lessThan (date)', results.length, results[0].get('objectId'))
})();

(async () => {
  const query = new NCMBQuery('QueryTest');
  const results = await query.in('array', ['c']).fetchAll()
  console.log('in', results.length, results[0].get('objectId'))
})();


