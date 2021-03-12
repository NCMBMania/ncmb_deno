import NCMB, { NCMBObject, NCMBQuery, NCMBAcl, NCMBGeoPoint } from '../index'
const config = require('../../config.json');
const applicationKey = config.applicationKey
const clientKey = config.clientKey
import * as assert from 'assert';
import NCMBUser from '../libs/user';

describe('Query test:', () => {
  before('Initialize NCMB', async () => {
    new NCMB(applicationKey, clientKey)
    for (let i = 0; i < 10; i++) {
      const obj = new NCMBObject('QueryTest')
      await obj
        .set('number', i)
        .save()
    }
  })

  it('Get with count', async () => {
    const query = new NCMBQuery('QueryTest')
    const number = 6
    const {count, results} = await query.limit(number).fetchWithCount()
    assert.equal(count, 10)
    assert.equal(results.length, number)
  })

  it('Using select (sub query)', async () => {
    const promises = []
    for (let index = 0; index < 5; index++) {
      const i = new NCMBObject('Test');
      promises.push(i
        .set('string', `I'm item #${index}`)
        .set('number', index)
        .save());
      const j = new NCMBObject('Test2');
      promises.push(j
        .set('string', `I'm test2 #${index}`)
        .set('num', index)
        .save());
    }
    await Promise.all(promises);

    const queryTest = new NCMBQuery('Test');
    const queryTest2 = new NCMBQuery('Test2');
    queryTest2.in('num', [1,4]);
    const ary = await queryTest.select('number', 'num', queryTest2).fetchAll();
    ary.forEach(a => {
      assert.equal([1, 4].indexOf(a.get('number')) > -1, true);
    });
  });

  it('Using inQuery (sub query)', async () => {
    const promises = []
    const ary = [];
    for (let index = 0; index < 5; index++) {
      const i = new NCMBObject('Test');
      promises.push(i
        .set('string', `I'm item #${index}`)
        .set('number', index)
        .save());
      ary.push(i);
    }
    const res = await Promise.all(promises);
    const promises2 = []
    const ary2 = [];
    for (let index = 0; index < 5; index++) {
      const i = new NCMBObject('Test2');
      promises2.push(i
        .set('string', `I'm test2 #${index}`)
        .set('num', ary[index])
        .save());
      ary2.push(i);
    }
    const res2 = await Promise.all(promises2);
    const queryTest = new NCMBQuery('Test');
    const queryTest2 = new NCMBQuery('Test2');
    queryTest.in('number', [1,4]);
    const ary3 = await queryTest2.inQuery('num', queryTest).include('num').fetchAll();
    assert.equal(ary3.length, 2);
    ary3.forEach(a => {
      assert.equal([1, 4].indexOf(a.get('num').get('number')) > -1, true);
    });
  });

  after('Delete all data', async () => {
    const p: Promise<boolean>[] = [];
    for (const name of ['QueryTest', 'Test', 'Test2']) {
      const query = new NCMBQuery(name)
      const ary = await query
        .limit(1000)
        .fetchAll()
      ary.forEach((o: NCMBObject) => p.push(o.delete()))
    }
    await Promise.all(p);
  });

})