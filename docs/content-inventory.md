# 首版內容清單與來源

逐頁 ID、路由、必要章節及進度記錄在 [catalog.json](../content/catalog.json)，目前均為 planned；第一步只完成資料範例，不將頁面標為完成。

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

## 第一階段範例

- Sliding Window：非負數預算上限的最長窗口標準模板，以及固定窗口最大平均變形；三語言皆提供完整函式。
- 題目索引：LeetCode 643 一題，已核對題號、難度及 URL；未聲明任何題單歸屬。
- 測驗：三種題型各一題，用於驗證契約，尚未達到正式題庫數量。

## 題目與題單核對紀錄（2026-09-28）

機器可讀來源保存在 [sources.json](../content/sources.json)。

| 來源 | 本次核對範圍 | 狀態 |
|---|---|---|
| [LeetCode 643](https://leetcode.com/problems/maximum-average-subarray-i/) | 題號 643、Maximum Average Subarray I、Easy、固定 k 的最大平均 | verified |
| [Blind 75 作者說明](https://www.techinterviewhandbook.org/best-practice-questions/) | 定位原作者來源，避免混用 Grind 75 | pending：未逐題核對 |
| [Top Interview 150](https://leetcode.com/studyplan/top-interview-150/) | 確定 LC150 指此官方題單 | pending：未逐題核對 |

後续每新增題目先查官方題目頁，再查題單；在來源 notes 記錄實際核對的 ID，確認後才新增 collection_source_ids。第一階段沒有完整題單副本；至少 20 道題目的數量及六篇代表題的選題在第 5 步完成。
