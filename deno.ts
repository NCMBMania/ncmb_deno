import { promisify } from 'util'
import * as fs  from 'fs'

(async () => {
  const dir = './deno/libs/'
  const ary = await promisify(fs.readdir)(dir)
  for (const file of ary) {
    if (!file.match(/.*\.ts$/)) continue;
    const filePath = `${dir}${file}`;
    let str = await promisify(fs.readFile)(filePath, 'utf-8')
    str = str.replace(/from ".\.\/index.ts"/g, "from '../ncmb.ts'")
    str = str.replace(/from "..\/@types\/misc"/g, "from '../@types/misc.d.ts'")    
    await promisify(fs.writeFile)(filePath, str)
  }
})();