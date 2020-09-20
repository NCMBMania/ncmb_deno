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

  await NCMBUser.logout()
  const anony = await NCMBUser.loginAsAnonymous()
  console.log(anony)

  await NCMBUser.logout()
  const signUpUser = await NCMBUser.signUp('tester3', 'tester3')
  console.log(signUpUser.get('objectId'));
  await signUpUser.delete();

  await NCMBUser.logout()

  await NCMBUser.requestSignUpEmail('tester4@moongift.jp')
  const mailAddress = 'tester3@moongift.jp'
  const password = '7CbdL6@nVbMQCKF'

  await NCMBUser.logout()
  const emailLogin = await NCMBUser.loginWithEmail(mailAddress, password)
  console.log(emailLogin)

  await NCMBUser.requestPasswordReset(mailAddress)

  const u = new NCMBUser;
  u.set('objectId', '7iEjQO7b4DFQXn0R')
  await u.fetch()
  console.log(u)

})()
