import { NCMB, NCMBUser } from '../index'
const config = require('../config.json');
const applicationKey = config.applicationKey
const clientKey = config.clientKey

const ncmb = new NCMB(applicationKey, clientKey);

(async () => {
  const user = await NCMBUser.login('tester', 'tester')
  console.log(user)
})()
