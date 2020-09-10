# NCMB SDK for deno & TypeScript

denoでNCMB（ニフクラ mobile backend）を使うためのSDKです。非公式ライブラリになります。Node.js × TypeScript環境でも動作します。

[mBaaSでサーバー開発不要！ | ニフクラ mobile backend](https://mbaas.nifcloud.com/)

## 使い方

denoをインストールします。

[Deno](https://deno.land/)

### サンプルコード

オブジェクトを保存するコードです。 `test.ts` として保存してください。

```js
import { NCMB, NCMBObject } from 'https://raw.githubusercontent.com/goofmint/ncmb_deno/master/ncmb.ts'

// 初期化
const ncmb = new NCMB('YOUR_APPLICATION_KEY', 'YOUR_CLIENT_KEY')

// オブジェクト作成
const hello = new NCMBObject('HelloDeno')

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

### インストール

npmなどで行います。

```
npm install ncmb_ts -S
```

基本的に使い方は変わりませんが、ルートでのasync/awaitはサポートされていないので注意してください。

```ts
import { NCMB, NCMBObject } from 'ncmb_ts'

const ncmb = new NCMB('YOUR_APPLICATION_KEY', 'YOUR_CLIENT_KEY')
const hello = new NCMBObject('HelloDeno');

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

### デバイストークン

#### 登録

```js
const installation = new NCMBInstallation

await installation
  .set('deviceToken', 'aaaa')
  .set('deviceType', 'android')
  .save();
```

#### 更新

```js
await installation
  .set('deviceToken', 'bbbb')
  .save();
```

## License

MIT.
