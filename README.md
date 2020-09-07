# NCMB SDK for deno & TypeScript

denoでNCMB（ニフクラ mobile backend）を使うためのSDKです。非公式ライブラリになります。Node.js × TypeScript環境でも動作します。

[mBaaSでサーバー開発不要！ | ニフクラ mobile backend](https://mbaas.nifcloud.com/)

## 使い方

denoをインストールします。

[Deno](https://deno.land/)

### サンプルコード

オブジェクトを保存するコードです。 `test.ts` として保存してください。

```js
import NCMB from 'https://raw.githubusercontent.com/goofmint/ncmb_deno/master/ncmb.ts'

// 設定をJSONにしている場合
import { readJson } from 'https://deno.land/std/fs/read_json.ts'
const config = await readJson('./config.json') as { [s: string]: string }
const applicationKey = config.applicationKey
const clientKey = config.clientKey

// 初期化
const ncmb = new NCMB(applicationKey, clientKey)

// オブジェクト作成
const hello = ncmb.Object('HelloDeno')

// 値を設定して保存
await hello
  .set('message', 'Hello world')
  .set('number', 100)
  .save()

// 保存できていればオブジェクトIDが出力されます
console.log(hello.get('objectId'))
```

### 実行

`--allow-net` は必須です。 `--allow-read` は設定ファイルを読み込む際に必須です。

```
deno run --allow-net --allow-read test.ts
```

## Node.js × TypeScriptの場合

基本的に使い方は変わりませんが、ルートでのasync/awaitはサポートされていないので注意してください。

```ts
(async () =>  {
  await hello
    .set('message', 'Hello world')
    .set('number', 100)
    .save()
  console.log(hello.get('objectId'))

  await hello
    .set('number', 200)
    .save()

  console.log(hello.get('number'))

  const query = ncmb.Query('HelloDeno')
  query.equalTo('objectId', 'ypk03ZHeJxjSnSM1')
  query.limit(1)
  const results = await query.fetchAll()
  console.log(results)
})();
```

VS Codeなどで入力補完が使えます。

![](images/type_suggest_1.png)

![](images/type_suggest_2.png)

## License

MIT.
