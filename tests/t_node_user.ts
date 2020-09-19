import { NCMB, NCMBUser } from '../index'
const config = require('../config.json');
const applicationKey = config.applicationKey
const clientKey = config.clientKey

const ncmb = new NCMB(applicationKey, clientKey);

(async () => {
  const user = await NCMBUser.login('tester', 'tester')
  console.log(user)

  const user2 = await NCMBUser.signUp('tester2', 'tester')
  console.log(user2.get('objectId'))
  await user2.delete()
})()
