import NCMB, { NCMBObject, NCMBAcl, NCMBQuery, NCMBUser, NCMBGeoPoint, NCMBFile } from '../deno/ncmb.ts'
import { readJson } from 'https://deno.land/std@0.66.0/fs/read_json.ts'
import {
  assertEquals,
  assertArrayContains,
} from "https://deno.land/std@0.65.0/testing/asserts.ts";
import fs from "https://deno.land/std@0.90.0/fs/mod.ts"

const config = await readJson('./config.json') as { [s: string]: string }
const applicationKey = config.applicationKey
const clientKey = config.clientKey

new NCMB(applicationKey, clientKey)

function promisify(original: Function) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      original.call(this, ...args, (err, ...values) => {
        if (err) reject(err);
        else resolve(...values);
      })
    })
  }
}

Deno.test({
  name: "Upload text as text file",
  fn: async () => {
    const fileName = 'test.csv';
    const file = await NCMBFile.upload(fileName, '1,2,3');
    assertEquals(fileName, file.get('fileName'));
  }
})

Deno.test({
  name: "Upload binary from local file",
  fn: async function () {
    const fileName = 'test.jpg';
    const blob = await promisify(fs.readFile)(`./src/tests/${fileName}`);
    const file = await NCMBFile.upload(fileName, blob);
    assertEquals(fileName, file.get('fileName'));
  }
})

Deno.test({
  name: "Upload file and delete it",
  fn: async () => {
    const fileName = 'test.csv';
    const file = await NCMBFile.upload(fileName, '1,2,3');
    assertEquals(fileName, file.get('fileName'));
    await file.delete();
  }
})

Deno.test({
  name: "Upload text and download it",
  fn: async () => {
    const text = '1,2,3';
    const fileName = 'test.csv';
    const file = await NCMBFile.upload(fileName, text);
    assertEquals(fileName, file.get('fileName'));
    const download = await file.download();
    assertEquals(text, download);
  }
})

Deno.test({
  name: "Upload binary file and download it",
  fn: async () => {
    const fileName = 'test.jpg';
    const blob = await promisify(fs.readFile)(`./src/tests/${fileName}`);
    const file = await NCMBFile.upload(fileName, blob);
    assertEquals(fileName, file.get('fileName'));
    const download = await file.download('binary') as Blob;
    assertEquals(download.type, 'image/jpeg');
  }
})

Deno.test({
  name: "Retribute files",
  fn: async () => {
    const query = NCMBFile.query();
    const files = await query.fetchAll();
    assertEquals(files[0] instanceof NCMBFile, true);
  }
})

Deno.test({
  name: "Delete all files",
  fn: async () => {
    const query = NCMBFile.query();
    const files = await query.fetchAll();
    const promises: Promise<boolean>[] = [];
    files.forEach(f => promises.push(f.delete()));
    await Promise.all(promises);
    const count = await query.fetchAll();
    assertEquals(count.length, 0);
  }
})

Deno.test({
  name: "Upload several files",
  fn: async () => {
    const promises: Promise<NCMBFile>[] = [];
    for (let i = 0; i < 3; i++) {
      promises.push(NCMBFile.upload(`${i}.txt`, `Hello, #${i}`));
    }
    for (let i = 0; i < 3; i++) {
      promises.push(NCMBFile.upload(`${i}.csv`, `${i},2,3`));
    }
    await Promise.all(promises);
    const query = NCMBFile.query();
    const files = await query.fetchAll();
    assertEquals(files.length, 6);
    const files2 = await query.regularExpressionTo('fileName', /^.*?\.txt/).fetchAll();
    assertEquals(files2.length, 3);
    const files3 = await query.greaterThan('fileSize', 8).fetchAll();
    assertEquals(files3.length, 3);
    const deletes: Promise<boolean>[] = [];
    files.forEach(f => deletes.push(f.delete()));
    await Promise.all(deletes);
  }
})

Deno.test({
  name: "Upload file with ACL",
  fn: async () => {
    const userNameAndPassword = 'tester1';
    const user = new NCMBUser;
    user.set('userName', userNameAndPassword).set('password', userNameAndPassword );
    await user.signUpByAccount();
    const loginUser = await NCMBUser.login(userNameAndPassword, userNameAndPassword);
    if (!loginUser) throw new Error('Login failed');
    const acl = new NCMBAcl;
    acl
      .setPublicReadAccess(false)
      .setUserWriteAccess(loginUser, true)
      .setUserReadAccess(loginUser, true);
    const text = '1,2,3';
    const fileName = 'acl2.csv';
    const file = await NCMBFile.upload(fileName, text, acl);

    const sessionToken = NCMBUser.ncmb.sessionToken;
    NCMBUser.ncmb.sessionToken = null;
    try {
      const file = new NCMBFile;
      file.set('fileName', fileName);
      await file.download();
      assert.isTrue(false);
    } catch (e) {
      assertEquals(e.message, 'E403001: No access with ACL.');
    }
    NCMBUser.ncmb.sessionToken = sessionToken;
    const download = await file.download();
    assertEquals(text, download);
    file.delete();
    loginUser.delete();
    NCMBUser.logout();
  }
})