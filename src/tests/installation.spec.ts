import { describe, it, before } from 'mocha';
import NCMB, { NCMBObject, NCMBGeoPoint, NCMBPush, NCMBQuery, NCMBInstallation } from '../index';
const config = require('../../config.json');
import { assert } from 'chai';

describe('Installation API', () => {
  before('Init', () => {
    new NCMB(config.applicationKey, config.clientKey);
    const push = new NCMBPush();
  });

  it('Save successful', async () => {
    const installation = new NCMBInstallation;
    await installation
      .set('deviceToken', 'cccc')
      .set('deviceType', 'android')
      .save()
    assert.equal(!!installation.get('objectId'), true)
  })

  it('Save failed', async () => {
    const installation = new NCMBInstallation()
    try {
      await installation
        .set('deviceType', 'android')
        .save()
    } catch (e) {
      assert.equal(e.message, 'deviceToken is required.')
    }
  })

  it('Save failed for invalid deviceType', async () => {
    const installation = new NCMBInstallation()
    try {
      await installation
        .set('deviceType', 'mac')
        .save()
    } catch (e) {
      assert.equal(e.message, 'deviceType is only ios or android')
    }
  })

  it('Update successful', async () => {
    const installation = new NCMBInstallation;
    await installation
      .set('deviceToken', 'aaaaa')
      .set('deviceType', 'android')
      .save()
    await installation
      .set('deviceToken', 'dddd')
      .save();
    const installation2 = new NCMBInstallation;
    await installation2.set('objectId', installation.get('objectId')).fetch()
    assert.equal(installation.get('deviceToken'), installation2.get('deviceToken'))
  })

  it('Query and delete all', async () => {
    const query = NCMBInstallation.query();
    const ary = await query.limit(1000).fetchAll();
    const p:Promise<boolean>[] = [];
    ary.forEach(a => {
      p.push(a.delete());
    })
    await Promise.all(p);
  })
})
