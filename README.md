# Coding Guide

LeetCode 新手引導手冊，純靜態 React 網站。目前包含資料契約與網站骨架：32 個頁面路由、響應式導覽、Markdown 文章及 JSON 模板預覽。完整教材與互動教學仍依 plan 後續階段製作。

已完成 Sliding Window 互動頁面：五種變形、三語言 tab、差異片段與完整程式碼、適用前提、反例及 LeetCode 連結。可直接開啟 `/templates/sliding-window#variation-shrink-to-min`。

第 4 步已完成六模式模板庫（8 個標準模板、13 種變形）及跨模式搜尋。從 `/templates` 輸入「二分答案」「找環」等線索，即可查看匹配理由、前提並進入對應變形。其他完整教材依後續計畫交付。

## 文件

第 6 步概念測驗已完成：前往 `/quiz` 可綜合抽 6 題或指定模式練 4 題，支援三種題型、評分解說、重做及重新抽題。題庫共 24 題，作答不保存；目前共 29/32 頁 ready。`npm test` 驗證答案正規化與抽題規則，`npm run test:e2e` 驗證實際作答與手機鍵盤操作。

第 5 步已交付 10 頁資料結構、8 組三語言對照、6 篇引導教學、Big O 六案例及六階段 Roadmap，目前 28/32 頁 ready、22 道練習題。Blind 75 已核對本庫中的 9 題；Top Interview 150 歸屬尚待核對，詳見內容清單。

- [規格 v4](docs/spec.md)
- [實作計畫](docs/plan.md)
- [資料契約](docs/data-contracts.md)
- [內容清單及来源](docs/content-inventory.md)

## 本機驗證

本專案以 Node.js 24 與 npm 驗證，搜尋單元測試直接載入 TypeScript，請使用 Node.js 24 以上。首次安裝可使用 `npm ci`；Windows PowerShell 如阻擋 npm.ps1，將 npm 改為 npm.cmd。

```sh
npm ci
npm run validate:content
npm test
npm run build
npm run test:e2e
```

驗證與測試不需要網路或 GitHub 帳號。安裝依賴需要 npm registry 連線。驗證失敗回傳非零退出碼；測試涵蓋缺欄位、重複 ID、錯誤引用、行號越界與測驗題型限制。

## 開發與預覽

```sh
npm run dev
# 正式產物預覽（先執行 npm run build）
npm run preview
```

開發網址預設為 http://127.0.0.1:5173，預覽為 http://127.0.0.1:4173。build 依序驗證內容、TypeScript 型別及產生 dist/，無後端服務。JSON 與 Markdown 在建置時納入，瀏覽網站不需連接內容 API。

`dev` 與 `build` 會先執行 `generate:code`，用 [Shiki](https://shiki.style/guide/install) 在本機產生三語言語法 token，輸出到忽略版控的 `src/generated/`。修改 JSON 後請重新啟動 dev 或重跑 `npm run generate:code`，以同步高亮。瀏覽器不執行範例程式。

教學程式的離線驗證：`python tests/verify_snippets.py`。需要 Python 3.9+、支援 `--release 8` 的 javac、Java 8+、g++（C++17）；會編譯實際 JSON 中的 Java/C++ 程式，並與 Python 實作及暴力解比對，每語言 371 組案例。暫存產物位於 `.snippet-check/`，不加入版控。此檢查僅供內容維護，不提供站內執行器。

其餘五模式使用 `python tests/verify_more_snippets.py`，涵蓋新增 15 個教學範例，每語言 601 組案例，包含整數邊界、重複值、空輸入、循環串列及不連通圖。

瀏覽器測試使用本機已安裝的 Microsoft Edge，會自動啟動 preview；其他環境可調整 playwright.config.ts 的 channel，並先安裝相應瀏覽器。測試涵蓋所有路由直接載入、深層路由重新整理、Markdown 連結、404、手機鍵盤導覽與程式碼溢出。

正式靜態託管需設定未知檔案路徑回退至 index.html，以支援 BrowserRouter；實際託管設定與部署留待發布階段。目前 Vite 的本機開發／預覽具備 SPA fallback。

實作參考：[Vite](https://vite.dev/guide/)、[React Router](https://reactrouter.com/start/declarative/installation)、[react-markdown](https://github.com/remarkjs/react-markdown)。

## 新增內容

教材程式驗證：`python tests/verify_articles.py`，使用與模板測試相同的 Python、Java、C++ 工具鏈，驗證島嶼教學每語言 64 組案例及 8 組語言對照。`npm test` 另檢查五篇沿用模板的教學程式保持一致。Markdown 的 Python／Java／C++ 連續程式區塊會顯示語言切換；語言對照頁改為並排顯示。新增或修改文章後需重新執行建置以更新語法上色。

先依 `schemas/` 與資料契約建立 JSON。每種模式一檔，題目以 ID 共用引用；完整教材放在 `content/articles/` 並更新 catalog。執行上述兩個檢查後再審查教學正確性。通過契約驗證不代表教材數量達標或網站已可發布。
