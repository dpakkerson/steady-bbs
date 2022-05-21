# Steady BBS

2ch ブラウザ互換掲示板サーバー


## 設置

### 前提

Node.js と npm と npx が動作すること

### 共通準備


#### ライブラリをインストール

serverとclientでnpm installします
```sh
cd server && npm install
cd ..
cd client && npm install
```

#### データベース初期化

serverでprismaの初期化を行います
```sh
cd server
npx prisma db push
npx prisma generate
```

### 開発用

serverとclientでそれぞれnpm run devとnpm startを実行します
```sh
cd server && npm run dev &
cd ..
cd client && npm start &
```

localhost:3000にアクセスすると掲示板が見えます

### サーバーにデプロイする

1. フロントエンドのコードをビルドします
```sh
cd client && npm build
cd ..
```

2. `NODE_ENV`を`production`に、`STEADYBBS_SERVE_FRONTEND`に何かしらの値をセットしてサーバーを起動します
```sh
cd server
NODE_ENV=production STEADYBBS_SERVE_FRONTEND=1 npm run dev
```

`PORT`環境変数でポート番号を変更できます。
