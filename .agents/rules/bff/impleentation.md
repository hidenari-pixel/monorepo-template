---
paths:
  - "apps/bff/**/*"
---

# bffの実装方針

## 必須原則

- BFF の新規実装・変更では `effect` を使用し、Promise、例外、依存関係、副作用を Effect の型として扱う。`effect-ts` skillを使用して実装を行うこと。
- クリーンアーキテクチャを採用し、依存関係は常に外側から内側へ向ける。ドメイン層とアプリケーション層から Hono、Cloudflare、DB、外部 API などの詳細へ依存してはならない。
- 関数型プログラミングを基本とし、純粋関数、不変データ、明示的な入出力、小さく合成可能な Effect を優先する。
- エラーを `throw` や曖昧な `Error` に集約せず、呼び出し側が判断できる型付きエラーとして設計する。
- SOLID 原則を意識する。ただし、将来の可能性だけを理由に不要な抽象化やレイヤーを増やさない。

## アーキテクチャと依存方向

責務を次のように分離する。

1. `domain`: エンティティ、値オブジェクト、ドメインルール、ドメインエラー。フレームワークや I/O に依存しない。
2. `usecase`: ユースケースと port。ドメインを組み合わせ、必要な依存を Effect service として要求する。
3. `infrastructure`: DB、外部 API、時刻、ID 生成などの adapter と Layer。外部ライブラリ由来の値やエラーをアプリケーションの型へ変換する。
4. `interface`: Hono の route、middleware、request/response schema。入力を検証してユースケースを呼び、結果を HTTP レスポンスへ変換する。
5. `runtime`: Layer の合成と Effect runtime の実行。具体的な依存の選択は composition root に集約する。

内側の層に Hono の `Context`、HTTP status、D1、Drizzle の query object、Cloudflare bindings を渡さない。route handler は薄く保ち、ビジネス判断を置かない。

## Effect の利用方針

- 再利用するユースケースやビジネスロジックは原則として `Effect.fn` で定義する。
- 外部依存は `Context.Tag` または `Effect.Service` で port として表現し、実装は `Layer` で提供する。
- Layer の提供は composition root で行い、ユースケース内部で場当たり的に `Effect.provide` しない。
- Promise を返す外部 API や DB は `Effect.tryPromise`、同期的に例外を投げる API は `Effect.try` で境界に取り込む。
- `Effect.runPromise` などの runtime 実行は HTTP handler などアプリケーション境界に限定する。内側の関数は Effect を返し、途中で実行しない。
- 順次処理には `Effect.gen`、変換には `Effect.map`、依存する処理の連結には `Effect.flatMap` を使い、合成可能性を保つ。
- 独立した処理には `Effect.all` などの並行処理を検討する。リソースの取得と解放には `Effect.acquireUseRelease` や `Effect.scoped` を使用する。
- 欠損し得る内部値は `Option` を優先し、`null` や `undefined` は HTTP・DB・JSON などの境界で変換する。
- `any`、`as never`、`as unknown` などで Effect の型エラーを回避しない。

## エラーハンドリング

- 想定可能な失敗は、意味のあるタグを持つ型付きエラーとして定義する。schema で表現できる場合は `Schema.TaggedErrorClass` を優先する。
- エラーは少なくとも次の観点で区別する。
  - 入力・validation error
  - 認証・認可 error
  - not found や conflict などの domain error
  - DB・外部 API・ネットワークなどの infrastructure error
  - timeout、rate limit、retry 可能な一時的 error
- 外部ライブラリの `unknown` な失敗は infrastructure 境界で捕捉し、cause を保持したアプリケーション固有エラーへ正規化する。
- Effect の failure は JavaScript の例外ではないため、`Effect.gen` 内の `try-catch` で処理しない。`Effect.catchTag`、`Effect.catch`、`Effect.match` などを使用する。
- HTTP status と公開レスポンスへの変換は presentation 層に集約する。内部エラーや機密情報をそのままクライアントへ返さない。
- 回復不能な defect と業務上想定される failure を区別する。想定される失敗を `Effect.die` や例外にしない。
- retry は一時的な失敗に限定し、`Schedule` で回数と backoff を明示する。validation や domain rejection を retry しない。
- 必要なコンテキストを構造化ログや span に付与する。認証情報、token、個人情報は記録しない。

## SOLID を適用する基準

- **Single Responsibility**: route、use case、repository、mapper、schema の責務を混在させない。
- **Open/Closed**: 分岐の追加が既存ユースケースの大幅な変更にならないよう、tagged union と service の差し替えを活用する。
- **Liskov Substitution**: service の test implementation と live implementation が同じ契約、成功値、エラー型を守る。
- **Interface Segregation**: 巨大な service を作らず、ユースケースが本当に必要とする小さな port を定義する。
- **Dependency Inversion**: application 層は DB client や SDK ではなく port に依存し、infrastructure 層が Layer として実装する。

## Validation と境界

- request body、path parameter、query parameter、環境変数、外部 API response は信頼せず、境界で schema decode する。
- decode 済みのドメイン値を内側へ渡し、内部で同じ validation を繰り返さない。
- API response 用 DTO とドメインモデルを必要に応じて分離し、DB row をそのまま公開しない。
- 日時、ID、金額、状態値など、意味や制約がある primitive は値オブジェクトや branded type を検討する。

## テスト方針

- ドメインの純粋関数とユースケースを重点的にテストする。
- application 層のテストでは test Layer を提供し、DB やネットワークへ接続せず成功・失敗・境界値を検証する。
- infrastructure adapter には契約テストまたは integration test を用意する。
- typed error の tag と HTTP error mapping を検証し、失敗経路を正常系と同じ重要度で扱う。
- 時刻、乱数、ID、外部サービスを service 化し、テストを決定的にする。

## 実装前後の確認

- ビジネスロジックが Hono handler や DB adapter に漏れていないか。
- 依存方向が内向きで、usecase/domain が infrastructure を import していないか。
- Effect を途中で Promise に戻さず、アプリケーション境界まで型付き failure を維持しているか。
- すべての外部入力を decode し、すべての外部失敗を正規化しているか。
- エラー型から HTTP response への mapping が網羅的か。
- service と interface がユースケースに対して大きすぎないか。
- 追加した抽象化が現在の要件に必要で、単純な純粋関数で十分な箇所を複雑にしていないか。
- typecheck、lint、format、関連テストが成功しているか。
