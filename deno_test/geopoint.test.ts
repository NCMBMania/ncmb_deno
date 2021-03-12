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
  name: "Valid object",
  fn: async () => {
    const lat = 35.6585805
    const lng = 139.7454329
    const obj = new NCMBGeoPoint(lat, lng)
    assertEquals(obj.latitude, lat)
    assertEquals(obj.longitude, lng)
  }
})

Deno.test({
  name: "Invalid object 1",
  fn: async () => {
    const lat = 91
    const lng = 139.7454329
    try {
      const obj = new NCMBGeoPoint(lat, lng)
      assertEquals(true, false)
    } catch (e) {
      assertEquals(e.message, `GeoPoint should not take latitude (${lat}) > 90.0.`)
    }
  }
})

Deno.test({
  name: "Invalid object 2",
  fn: async () => {
    const lat = -91
    const lng = 139.7454329
    try {
      const obj = new NCMBGeoPoint(lat, lng)
      assertEquals(true, false)
    } catch (e) {
      assertEquals(e.message, `GeoPoint should not take latitude (${lat}) < -90.0.`)
    }
  }
})

Deno.test({
  name: "Invalid object 3",
  fn: async () => {
    const lat = 35.6585805
    const lng = 181
    try {
      const obj = new NCMBGeoPoint(lat, lng)
      assertEquals(true, false)
    } catch (e) {
      assertEquals(e.message, `GeoPoint should not take longitude (${lng}) > 180.0.`)
    }
  }
})

Deno.test({
  name: "Invalid object 4",
  fn: async () => {
    const lat = 35.6585805
    const lng = -181
    try {
      const obj = new NCMBGeoPoint(lat, lng)
      assertEquals(true, false)
    } catch (e) {
      assertEquals(e.message, `GeoPoint should not take longitude (${lng}) < -180.0.`)
    }
  }
})