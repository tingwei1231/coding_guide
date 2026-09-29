# 靜態部署與發布驗收

## 部署設定

專案輸出為 `dist/`，無伺服器或資料庫需求。根目錄 `vercel.json` 已指定 Vite、`npm ci`、`npm run build` 及 SPA rewrite。部署平台先提供存在的靜態檔案，其餘路徑回到 `index.html`，由 React Router 顯示教材或 404 畫面。設定依據：[Vercel 靜態設定](https://vercel.com/docs/project-configuration/vercel-json)。

部署至 Vercel 時匯入 `tingwei1231/coding_guide`，專案根目錄選儲存庫根目錄，Node.js 選 24；確認套用上述設定後建立 Preview。此設定以網域根路徑部署為前提，不適用直接掛在 GitHub Pages 儲存庫子路徑。

本次只建立可審閱的設定，尚未建立 Vercel 專案或部署網址；本機預覽成功不等同託管環境已通過驗收。

## 本機驗收

首次安裝執行 `npm ci`，再執行 `npm run verify`，依序檢查單元測試、內容契約、語法上色生成、TypeScript、正式建置及瀏覽器流程。本機瀏覽器使用已安裝的 Microsoft Edge。

三語言教材另外執行以下指令，需要 Python 3.9+、支援 Java 8 編譯目標的 javac、Java 8+ 及 g++（C++17）：

```sh
python tests/verify_snippets.py
python tests/verify_more_snippets.py
python tests/verify_articles.py
```

GitHub Actions 工作流程位於 `.github/workflows/verify.yml`，於 push、pull request 或手動觸發時執行網站與教材程式驗證。CI 使用 Node.js 24 與 Playwright Chromium，失敗時保留測試產物。工作流程已建立，但尚未在 GitHub 實際執行；本機結果不代表 CI 結果。

## 部署網址驗收

取得可存取的 Preview URL 後，在 PowerShell 執行：

```powershell
$env:PLAYWRIGHT_BASE_URL = 'https://your-preview.vercel.app'
npm.cmd run test:e2e
Remove-Item Env:PLAYWRIGHT_BASE_URL
```

設定此變數時不啟動本機伺服器，所有測試直接存取目標網址。Preview 若啟用存取保護，需先依部署團隊規則取得測試存取方式。

檢查 32 個路由直接開啟及子路由重新整理、帶搜尋 query 與模板 hash 的網址、未知 URL 的站內 404、圖檔與程式碼上色、手機導覽、鍵盤焦點、語言分頁、變形 accordion、測驗送出與重做。SPA 的站內 404 通常由 HTTP 200 載入入口後顯示，並非伺服器 404 狀態碼。

## 本次結果與限制（2026-09-29）

- 31 項單元／內容測試與 13 項瀏覽器測試通過，正式建置成功，32/32 頁內容 ready。
- 模板程式每語言通過 371 + 601 組參考案例；文章島嶼範例每語言 64 組，另驗證 8 組語言對照。
- JavaScript 分檔約為主程式 179 kB、語法資料 298 kB、套件 413 kB（壓縮前），已移除單檔超過 500 kB 的警告。這是拆分快取邊界，並未改為按需載入，首次總下載量沒有因此大幅降低。分檔依據：[Vite 建置指南](https://vite.dev/guide/build)、[Rolldown codeSplitting](https://rolldown.rs/reference/OutputOptions.codeSplitting)。
- React Router 的 `use client` 建置提示仍存在；本專案為客戶端 SPA，本次瀏覽器測試未出現執行錯誤。
- LC150 已依使用者指定 wq1supld 的完整 150 題快照核對，本庫 15 題歸屬確認，第 5 步完成，見 [來源核對](top150-audit.md)。
- 實際 Preview／Production 部署與遠端 CI 尚未驗收，第 8 步維持「本機驗收及發布準備完成，遠端驗收待補」。

正式發布前應確認 CI 成功及部署網址測試成功，再將通過驗收的版本發布至 Production。若發生問題，回復到上一個已驗收部署，並用對應提交重新建立預覽；不要直接在生成的 dist 內手動修補。
