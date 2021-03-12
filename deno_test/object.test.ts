import NCMB, { NCMBObject, NCMBAcl, NCMBQuery, NCMBUser, NCMBGeoPoint } from '../deno/ncmb.ts'
import { readJson } from 'https://deno.land/std@0.66.0/fs/read_json.ts'
import {
  assertEquals,
  assertArrayContains,
} from "https://deno.land/std@0.65.0/testing/asserts.ts";

const config = await readJson('./config.json') as { [s: string]: string }
const applicationKey = config.applicationKey
const clientKey = config.clientKey

new NCMB(applicationKey, clientKey)

Deno.test({
  name: "Save object",
  fn: async () => {
    const hello = new NCMBObject('Hello')
    await hello
      .set('message', 'Hello world')
      .set('number', 100)
      .save()
      assertEquals(hello.get('objectId') !== '', true)
  }
})

Deno.test({
  name: "Update object",
  fn: async () => {
    const hello = new NCMBObject('Hello')
    await hello
      .set('message', 'Hello world')
      .set('number', 100)
      .save()
    assertEquals(hello.get('objectId') !== '', true)
    const message = 'Update message'
    await hello
      .set('message', message)
      .save()
    const hello2 = new NCMBObject('Hello')
    hello2.set('objectId', hello.get('objectId'))
    await hello2.fetch()
    assertEquals(hello.get('objectId'), hello2.get('objectId'))
    assertEquals(hello2.get('message'), message)
  }
})

Deno.test({
  name: "Save with object",
  fn: async () => {
    const hello = new NCMBObject('Hello')
    const message = 'Hello world'
    await hello
      .set('message', message)
      .set('number', 100)
      .save()
    assertEquals(hello.get('objectId') !== '', true)
    const hello2 = new NCMBObject('Hello')
    await hello2
      .set('message', 'Relative object')
      .set('hello', hello)
      .set('number', 100)
      .save()
    assertEquals(hello2.get('objectId') !== '', true)
    const Hello = new NCMBQuery('Hello')
    const hello3 = await Hello
      .include('hello')
      .equalTo('objectId', hello2.get('objectId'))
      .fetch();
    if (hello3) {
      assertEquals(hello3.get('hello').get('message'), message)
    } else {
      assertEquals(true, false)
    }
  }
})

Deno.test({
  name: "Increment object",
  fn: async () => {
    const hello = new NCMBObject('Hello')
    const message = 'Hello world'
    await hello
      .set('message', message)
      .set('number', 100)
      .save()
    await hello
      .setIncrement('number', 2)
      .save();
    await hello.fetch();
    assertEquals(hello.get('number'), 102)
  }
})

Deno.test({
  name: "Save with Acl",
  fn: async () => {
    const hello = new NCMBObject('Hello')
    const acl = new NCMBAcl;
    acl
      .setRoleReadAccess('Admin', true)
      .setRoleWriteAccess('Admin', true)
    
    const message = 'Hello world'
    await hello
      .set('message', message)
      .set('number', 100)
      .set('acl', acl)
      .save()
    try {
      hello.fetch()
      assertEquals(true, false)
    } catch (e) {
    }
    await NCMBUser.login('admin', 'admin')
    await hello.fetch()
    assertEquals(hello.get('number'), 100)
    await hello.delete();
    await NCMBUser.logout()
  }
})

Deno.test({
  name: "Save with GeoPoint",
  fn: async () => {
    const hello = new NCMBObject('Hello')
    const lat = 35.6585805;
    const geo = new NCMBGeoPoint(lat, 139.7454329)
    hello
      .set('geo', geo)
      .save()
    await hello.fetch()
    assertEquals(hello.get('geo') instanceof NCMBGeoPoint, true)
    assertEquals(hello.get('geo').latitude, lat)
  }
})

Deno.test({
  name: "Delete all data",
  fn: async () => {
    const p: Promise<boolean>[] = [];
    const Hello = new NCMBQuery('Hello');
    const ary = await Hello
      .limit(1000)
      .fetchAll();
    ary.forEach((o: NCMBObject) => p.push(o.delete()));
    await Promise.all(p);
  }
});
