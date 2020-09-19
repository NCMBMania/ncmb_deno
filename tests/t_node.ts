import { NCMB, NCMBObject, NCMBQuery, NCMBAcl, NCMBGeoPoint } from '../index'
const config = require('../config.json');
const applicationKey = config.applicationKey
const clientKey = config.clientKey

const ncmb = new NCMB(applicationKey, clientKey)
const hello = new NCMBObject('HelloDeno');

(async () =>  {
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
  const geo = new NCMBGeoPoint(35.0, 100.0);
  const hello2 = new NCMBObject('HelloDeno')
  await hello2
    .set('message', 'Hello world')
    .set('number', 100)
    .set('acl', acl) 
    .set('hello1', hello)
    .set('geo', geo)
    .save()
  await hello.delete()
  const query = new NCMBQuery('HelloDeno')
  query.equalTo('objectId', 'ypk03ZHeJxjSnSM1')
  query.limit(1)
  const results = await query.fetchAll()
  console.log(results)
})();
