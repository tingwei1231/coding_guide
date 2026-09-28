# Coding Guide

LeetCode 新手引導手冊，純靜態網站。現階段完成 plan 第一步：規格、資料契約、內容清單與驗證工具；尚未建立前端網站。

## 文件

- [規格 v4](docs/spec.md)
- [實作計畫](docs/plan.md)
- [資料契約](docs/data-contracts.md)
- [內容清單及来源](docs/content-inventory.md)

## 本機驗證

需要 Node.js 22 以上與 npm。首次安裝可使用 `npm ci`；Windows PowerShell 如阻擋 npm.ps1，將 npm 改為 npm.cmd。

```sh
npm ci
npm run validate:content
npm test
```

驗證與測試不需要網路或 GitHub 帳號。安裝依賴需要 npm registry 連線。驗證失敗回傳非零退出碼；測試涵蓋缺欄位、重複 ID、錯誤引用、行號越界與測驗題型限制。

## 新增內容

先依 `schemas/` 與資料契約建立 JSON。每種模式一檔，題目以 ID 共用引用；完整教材放在 `content/articles/` 並更新 catalog。執行上述兩個檢查後再審查教學正確性。通過契約驗證不代表教材數量達標或網站已可發布。
