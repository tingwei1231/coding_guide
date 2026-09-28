# Coding Guide

LeetCode 新手引導手冊，純靜態 React 網站。目前包含資料契約與網站骨架：32 個頁面路由、響應式導覽、Markdown 文章及 JSON 模板預覽。完整教材與互動教學仍依 plan 後續階段製作。

## 文件

- [規格 v4](docs/spec.md)
- [實作計畫](docs/plan.md)
- [資料契約](docs/data-contracts.md)
- [內容清單及来源](docs/content-inventory.md)

## 本機驗證

需要 Node.js 22.12 以上與 npm（本機使用 Node.js 24）。首次安裝可使用 `npm ci`；Windows PowerShell 如阻擋 npm.ps1，將 npm 改為 npm.cmd。

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

瀏覽器測試使用本機已安裝的 Microsoft Edge，會自動啟動 preview；其他環境可調整 playwright.config.ts 的 channel，並先安裝相應瀏覽器。測試涵蓋所有路由直接載入、深層路由重新整理、Markdown 連結、404、手機鍵盤導覽與程式碼溢出。

正式靜態託管需設定未知檔案路徑回退至 index.html，以支援 BrowserRouter；實際託管設定與部署留待發布階段。目前 Vite 的本機開發／預覽具備 SPA fallback。

實作參考：[Vite](https://vite.dev/guide/)、[React Router](https://reactrouter.com/start/declarative/installation)、[react-markdown](https://github.com/remarkjs/react-markdown)。

## 新增內容

先依 `schemas/` 與資料契約建立 JSON。每種模式一檔，題目以 ID 共用引用；完整教材放在 `content/articles/` 並更新 catalog。執行上述兩個檢查後再審查教學正確性。通過契約驗證不代表教材數量達標或網站已可發布。
