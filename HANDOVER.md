# オセロゲーム開発 引き継ぎ指示書

このドキュメントは、オセロゲーム開発プロジェクトを別のAIアシスタントに引き継ぐための指示書です。

## 1. プロジェクト概要
- **目的**: モダンでプレミアムなデザインのオセロ（リバーシ）ゲームをWebアプリケーションとして作成する。
- **ターゲット**: ブラウザ（デスクトップ/モバイル）。

## 2. 技術スタック
- **Runtime**: Node.js (LTS)
- **Framework**: Vite + React + TypeScript
- **Styling**: Vanilla CSS (CSS Variables, Animations)
- **Design**: プレミアム、ダークモード基調、グラスモーフィズム

## 3. 現在の進捗状況
- **計画策定**: 完了
    - 実装計画書: `C:\Users\se_pi\.gemini\antigravity\brain\3cebe484-b215-4afd-9c2e-7d956b4fd053/implementation_plan.md`
    - タスクリスト: `C:\Users\se_pi\.gemini\antigravity\brain\3cebe484-b215-4afd-9c2e-7d956b4fd053/task.md`
- **環境構築**: 途中
    - [x] Node.js (LTS) のインストール (Wingetを使用)
    - [ ] プロジェクトの初期化 (`npm create vite`)
        - 現状、ディレクトリには `.env` と `.gitignore` のみが存在し、`package.json` はありません。

## 4. 次のアクション（引き継ぎ後の作業）
1.  **Node.jsの動作確認**:
    - `node -v` および `npm -v` を実行し、正常にインストールされているか確認してください。
2.  **プロジェクトの作成**:
    - カレントディレクトリ (`c:/Users/se_pi/Desktop/test`) で以下のコマンドを実行し、React + TypeScript プロジェクトを作成してください。
    - `npm create vite@latest . -- --template react-ts`
    - ※既存の `.env`, `.gitignore` が競合する場合は、必要に応じて退避または削除を検討してください。
3.  **依存関係のインストール**:
    - `npm install`
4.  **実装の開始**:
    - `implementation_plan.md` に従い、コンポーネント作成とスタイリングを行ってください。

## 5. デザイン要件（重要）
- **見た目**: 単なるオセロではなく、「Wow」と思わせるリッチなUIにすること。
- **詳細**:
    - 深い緑とゴールド/黒/白の配色。
    - 石を置く際のアニメーション。
    - 盤面の3D感や光沢感。

以上
