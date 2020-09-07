import NCMB from './index'
const config = require('./config.json');
const applicationKey = config.applicationKey
const clientKey = config.clientKey

const ncmb = new NCMB(applicationKey, clientKey)
const hello = ncmb.Object('HelloDeno');


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

  const query = ncmb.Query('HelloDeno')
  query.equalTo('objectId', 'ypk03ZHeJxjSnSM1')
  query.limit(1)
  const results = await query.fetchAll()
  console.log(results)
})();
