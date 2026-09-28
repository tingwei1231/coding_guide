# 資料契約 v1（對應產品 spec v4）

## 格式與檔案

採 JSON Schema draft-07，使用 Ajv strict mode；未知欄位會失敗。文件使用 UTF-8。格式變動須同步修改 Schema、範例、驗證與文件；產品規格版本與資料契約版本獨立。

| 檔案 | Schema | 用途 |
|---|---|---|
| `content/patterns/<id>.json` | `patterns.schema.json` | 每模式一檔，標準模板與變形 |
| `content/problems.json` | `problems.schema.json` | 共用題目索引 |
| `content/quizzes.json` | `quizzes.schema.json` | 三種概念題型 |
| `content/sources.json` | `sources.schema.json` | 題目及題單核對來源 |
| `content/catalog.json` | `content.schema.json` | 逐頁清單與 Markdown 參照 |
| `schemas/common.schema.json` | 共用定義 | 三語言、教學欄位與 ID |

模式 ID 固定為 sliding-window、binary-search、two-pointers、bfs-dfs、backtracking、dp。尚未交付的模式可出現在規劃清單與索引中，不能把它們視為已有模板資料。

## 模板與變形

`standard_templates` 為陣列，支援 BFS/DFS 與 DP 多種基礎寫法。每份教學皆有 id、name、trigger_signal、keywords、prerequisites、counterexamples（scenario/reason）、explanation、complexity（time/space/reason）、code、problem_ids、content_ids。

`code` 強制包含 python、java、cpp，各自的 `lines` 是逐行字串陣列，空白行可為空字串；渲染時以 LF 串接。包含必要 import、函式或類別包裝，可搭配呼叫端使用，不要求各自提供 main。不得放未定義輔助函式或省略號占位。

變形額外提供：

- `base_template_id`：同模式下存在的標準模板 ID。
- `diff_from_standard`：語意變化與修改原因。
- `removed_code_notes`：刪除邏輯的說明，沒有刪除可留空陣列。
- `highlight_lines`：三語言各自的行號陣列，從 **1** 起算，對應該變形完整程式碼；不得重複或超界，可為空（僅刪除等情境）。並非自動產生的 Git diff。

模板 ID 在各模式的 standard_templates 內唯一；變形 ID 在各模式的 variations 內唯一，兩者為不同命名空間。變形深連結規約為 `/templates/<pattern>#variation-<id>`。

## 題目與來源

題目欄位包括 id、platform、number、name、difficulty、url、pattern_ids、source_id、collection_source_ids。平台目前只接受 leetcode，難度為 easy/medium/hard。題號與 URL 亦不可重複。

`source_id` 必須引用 verified 的 problem 來源，URL 與題目相同。題單歸屬只可引用 verified 的 collection 來源，核對者需在來源 notes 記錄涵蓋的題目 ID 與證據；驗證器能檢查引用及狀態，無法自動判斷網站內容真偽。

`collection_source_ids: []` 表示尚未聲明任何歸屬，不表示確定不在任何題單。checked_on 是最近檢查／嘗試檢查日期；pending 不可解讀為完成逐題核對。

## 教材參照與逐頁狀態

catalog 的 id 與 route 分別唯一；pattern_ids/problem_ids 必須有效。`planned` 頁可用 null markdown_path；`ready` 頁必須有實際存在的 `content/articles/*.md` 檔。sections 是該頁的必要章節清單。

結構資料產生的頁面也先以 planned 記錄；後續完成頁面時需提供其介紹文章再標 ready。教材參照允許連到規劃頁，網站公開時才檢查所有連結對象已交付。本步驗證不檢查首版數量、不宣稱發布就緒。

## 測驗契約

共用 id、pattern_ids、prompt、explanation、misconception、content_ids；以 `type` 區分：

- choice：options 至少兩個且 ID 唯一，answer_option_id 必須存在，只支援單選。
- text-fill：accepted_answers 至少一個，附 normalization。
- code-fill：另有 language、code_with_blank，恰好一個 `___` 表示單一空格。

normalization 明定 trim、collapse_whitespace、case_sensitive。先依設定去前後空白，再合併連續空白為一個空格，再決定是否轉小寫；答案與輸入使用同一流程，最後做完整字串比對。不要直接移除所有空白，以免改變程式語意。多種等價答案須逐筆列入，不能推論任意程式等價性。

## 驗證方式與限制

執行 `npm run validate:content` 與 `npm test`。Schema 處理型別、必填、範圍、未知欄位與題型；程式補充跨檔引用、唯一性、高亮上界與檔案存在性。JSON 語法、缺檔或驗證失敗皆回傳非零退出碼。

驗證器不執行教學程式、不連網核對題單，也不取代人工演算法審查。測試使用獨立複本注入壞資料，不修改實際內容。

技術依據：[Ajv JSON Schema 支援文件](https://ajv.js.org/json-schema.html)。
