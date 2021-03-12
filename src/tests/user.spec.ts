import NCMB, { NCMBObject, NCMBQuery, NCMBAcl, NCMBGeoPoint } from '../index'
const config = require('../../config.json');
const applicationKey = config.applicationKey
const clientKey = config.clientKey
import * as assert from 'assert';
import NCMBUser from '../libs/user';

describe('Object test:', () => {
  before('Initialize NCMB', () => {
    new NCMB(applicationKey, clientKey)
  })

  it('Sign up user', async () => {
    const user = (await NCMBUser.signUp(config.userName, config.password))!
    assert.equal(!!user.get('objectId'), true)
    NCMBUser.logout()
  })

  it('Login user', async () => {
    const user = await NCMBUser.login(config.userName, config.password)
    assert.equal(!!user!.get('objectId'), true)
    await user.delete()
    NCMBUser.logout()
  })

  it('Anonymous login user', async () => {
    const user = (await NCMBUser.loginAsAnonymous())!
    assert.equal(!!user.get('objectId'), true)
    await user.delete()
    NCMBUser.logout()
  })

  it('Send sign up email', async () => {
    await NCMBUser.requestSignUpEmail(config.testEmailAddress)
  })

  it('Login with email', async () => {
    const user = await NCMBUser.loginWithEmail(config.emailAddress, config.password)
    assert.equal(!!user.get('objectId'), true)
  })

  it('Request password reset email', async () => {
    await NCMBUser.requestPasswordReset(config.emailAddress)
  })

})
