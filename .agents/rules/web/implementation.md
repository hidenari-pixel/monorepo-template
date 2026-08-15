---
paths:
  - "apps/web/**/*"
---

# Web の実装方針

## 必須原則

- UI を構築する際は、`packages/ui` 配下にある共通コンポーネントを基本的に使用する。必要なコンポーネントがない場合は、アプリ固有の実装を追加する前に、`packages/ui` で再利用可能なコンポーネントとして提供できないか検討する。(`pnpm ui:add xxx`でshadcnからコンポーネントを追加可能)
- Web の UI を新規実装または変更する際は、`frontend-design` skill を使用して実装を行うこと。

## ディレクトリ構成

責務と依存範囲に応じて、以下のディレクトリ構成を守ること。

```text
apps/web/src/
├── components/                 # 複数の route から利用する共通コンポーネント
├── hooks/                      # 複数の route から利用する共通 React hook
├── lib/                        # 外部ライブラリ・サービスとの統合、設定、client、adapter
├── utils/                      # UI や外部ライブラリに依存しない共通ユーティリティ
└── routes/
    └── **/
        ├── -components/        # 対象 route に依存するコンポーネント
        ├── -hooks/             # 対象 route に依存する React hook
        ├── -utils/             # 対象 route に依存するユーティリティ
        └── route.tsx           # route のエントリーポイント
```

## 配置ルール

- 特定の route だけで使用する実装は、その route 配下の `-components`、`-hooks`、`-utils` に配置する。
- 複数の route から実際に利用する実装は、`src/components`、`src/hooks`、`src/lib`、`src/utils` の該当するディレクトリに配置する。
- `src/components` には、`packages/ui` の基礎コンポーネントを組み合わせた、アプリケーション固有の共通コンポーネントを配置する。
- `lib` は外部ライブラリやサービスとの境界を担う。ライブラリの初期化・設定、client の生成、adapter、薄い wrapper などを配置する。
- `utils` はアプリケーション内で再利用する値変換や判定などを担う。特定の UI や外部ライブラリに依存させず、可能な限り純粋関数として実装する。
- `route.tsx` はルーティング設定、データの受け渡し、route 全体の構成に責務を限定する。詳細な UI やロジックは同じ route 配下の適切なディレクトリへ分離する。
- 将来再利用する可能性だけを理由に共通ディレクトリへ移動しない。複数の route から実際に利用される段階で共通化する。
