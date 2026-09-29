# 首版內容清單與來源

逐頁 ID、路由、必要章節及進度記錄在 [catalog.json](../content/catalog.json)。2026-09-29 已完成六種模式頁面並標記 ready；其餘 26 頁仍為 planned，網站骨架可瀏覽但完整內容尚未交付。

| 頁面群 | 預定內容 | 階段 |
|---|---|---|
| 首頁、索引 | 定位與學習入口、資料結構／模板／教學索引 | 2、7 |
| 資料結構 10 頁 | Array、String、HashMap/Set、LinkedList、Stack、Queue、Heap、Tree（BST/Trie）、Graph、Union-Find | 5 |
| 語言對照 | 陣列、字串、雜湊表、集合、堆疊、佇列、優先佇列、排序共 8 組 | 5 |
| Sliding Window | 標準模板＋固定、最長、最短、頻率、單調隊列共 5 種變形 | 3 |
| Binary Search | 標準模板＋確切值、左右邊界、旋轉陣列、二分答案共 4 種 | 4 |
| Two Pointers | 標準模板＋對撞、快慢、多指針、原地分割共 4 種 | 4 |
| BFS/DFS | BFS、DFS 標準模板；完整變形後續擴充 | 4 |
| Backtracking | 標準模板；完整變形後續擴充 | 4 |
| DP | top-down、bottom-up，解釋是否可重複選取；完整變形後續擴充 | 4 |
| 引導教學 6 篇 | 各模式一篇，辨識、暴力解、關鍵觀察、虛擬碼與三語言、複雜度 | 5 |
| Roadmap | 六階段，每階段先備知識、目標、教材、題目 | 5 |
| Big O | O(1)、O(log n)、O(n)、O(n log n)、O(n²)、遞迴時間與額外空間六案例 | 5 |
| Quiz | 六模式各至少 4 題，共至少 24 題，含三種題型與解說 | 6 |
| Mock interview | 3 個口述練習、5 個行為提示、1 個 STAR 範例與溝通指南 | 7 |
| Career prep | 履歷、作品集、前一週及前一天 checklist | 7 |

## 已交付內容（第 4 步）

- Sliding Window：非負數預算上限標準模板，以及固定窗口、最長、最短、頻率、單調隊列五種變形；18 份三語言完整程式碼與互動比較頁面。
- Binary Search 與 Two Pointers 各一個標準模板、四種變形；BFS/DFS 兩種標準模板、Backtracking 一種、DP 兩種。六模式合計 8 個標準模板、13 種變形、63 份三語言程式碼。
- 模板索引與各模式頁的關鍵字搜尋已完成，結果包含匹配理由與適用前提，可直接開啟變形。
- 題目索引：LeetCode 643、3、209、76、567、239 共六題，已核對官方題號、難度與 URL；未聲明任何題單歸屬。76 為頻率範例實作，567 作為固定長度頻率延伸題。
- 測驗：三種題型各一題，用於驗證契約，尚未達到正式題庫數量。
- 第 4 步新增 14 道題目（704、34、33、875、1011、167、11、141、876、15、283、26、78、198），目前共 20 道官方來源已核對的題目；題單歸屬仍待第 5 步逐題核對。

## 題目與題單核對紀錄（2026-09-28～29）

機器可讀來源保存在 [sources.json](../content/sources.json)。

| 來源 | 本次核對範圍 | 狀態 |
|---|---|---|
| [LeetCode 643](https://leetcode.com/problems/maximum-average-subarray-i/) | 題號 643、Maximum Average Subarray I、Easy、固定 k 的最大平均 | verified |
| [Blind 75 作者說明](https://www.techinterviewhandbook.org/best-practice-questions/) | 定位原作者來源，避免混用 Grind 75 | pending：未逐題核對 |
| [Top Interview 150](https://leetcode.com/studyplan/top-interview-150/) | 確定 LC150 指此官方題單 | pending：未逐題核對 |

後續每新增題目先查官方題目頁，再查題單；在來源 notes 記錄實際核對的 ID，確認後才新增 collection_source_ids。20 道題目的最低數量已達標；六篇代表題、路徑教材及題單歸屬仍在第 5 步完成。
