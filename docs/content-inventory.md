# 首版內容清單與來源

逐頁 ID、路由、必要章節及進度記錄在 [catalog.json](../content/catalog.json)。2026-09-29 共 32/32 頁 ready，包含首頁、模擬面試及求職準備。頁面內容完成與外部題單歸屬核對、發布驗收分開記錄。

| 頁面群 | 預定內容 | 階段 |
|---|---|---|
| 首頁、索引 | 定位與學習入口、資料結構／模板／教學索引 | 2、7 |
| 資料結構 10 頁 | Array、String、HashMap/Set、LinkedList、Stack、Queue、Heap、Tree（BST/Trie）、Graph、Union-Find | 5 |
| 語言對照 | 陣列、字串、hash map、集合、stack、queue、priority queue、排序共 8 組 | 5 |
| Sliding Window | 標準模板＋固定、最長、最短、頻率、monotonic deque 共 5 種變形 | 3 |
| Binary Search | 標準模板＋確切值、左右邊界、旋轉陣列、二分答案共 4 種 | 4 |
| Two Pointers | 標準模板＋對撞、快慢、多指標、原地分割共 4 種 | 4 |
| BFS/DFS | BFS、DFS 標準模板；完整變形後續擴充 | 4 |
| Backtracking | 標準模板；完整變形後續擴充 | 4 |
| DP | top-down、bottom-up，解釋是否可重複選取；完整變形後續擴充 | 4 |
| 引導教學 6 篇 | 各模式一篇，辨識、暴力解、關鍵觀察、虛擬碼與三語言、複雜度 | 5 |
| Roadmap | 六階段，每階段先備知識、目標、教材、題目 | 5 |
| Big O | O(1)、O(log n)、O(n)、O(n log n)、O(n²)、遞迴時間與額外空間六案例 | 5 |
| Quiz | 六模式各至少 4 題，共至少 24 題，含三種題型與解說 | 6 |
| Mock interview | 3 個口述練習、5 個行為提示、1 個 STAR 範例與溝通指南 | 7 |
| Career prep | 履歷、作品集、前一週及前一天 checklist | 7 |

## 已交付內容（截至第 7 步）

- 首頁提供基礎、模式、測驗、面試及求職的學習入口；模擬面試包含三個技術口述練習、五個行為題、一個虛構 STAR 範例與溝通指南。
- 求職準備包含履歷建議及改寫示例、作品集檢查項目、前一週七項與前一天六項準備清單，不保存使用者進度。

- Sliding Window：非負數預算上限標準模板，以及 fixed-size window、最長、最短、頻率、monotonic deque 五種變形；18 份三語言完整程式碼與互動比較頁面。
- Binary Search 與 Two Pointers 各一個標準模板、四種變形；BFS/DFS 兩種標準模板、Backtracking 一種、DP 兩種。六模式合計 8 個標準模板、13 種變形、63 份三語言程式碼。
- 模板索引與各模式頁的關鍵字搜尋已完成，結果包含匹配理由與適用前提，可直接開啟變形。
- 最初題目索引：LeetCode 643、3、209、76、567、239 共六題，已核對官方題號、難度與 URL。76 為頻率範例實作，567 作為固定長度頻率延伸題。
- 測驗：六模式各 4 題，共 24 題，各模式均涵蓋三種題型。已交付隨機抽題、作答、逐題評分與解說、常見誤解、教材連結及重做；重新整理或離開頁面清除作答紀錄。
- 第 4 步新增 14 道題目（704、34、33、875、1011、167、11、141、876、15、283、26、78、198）；第 5 步新增 200、39，現在共有 22 道官方來源已核對的題目。
- 10 頁資料結構包含定義、圖解、操作複雜度、適用情境及常見誤區；8 組語言對照支援桌面並排與手機垂直排列。
- 6 篇引導教學各包含五階段、虛擬碼、三語言完整實作與延伸題，並連結模板；Big O 提供 6 個逐步推導，Roadmap 提供六階段的先備知識、目標、教材及題目。

## 題目與題單核對紀錄（2026-09-28～29）

機器可讀來源保存在 [sources.json](../content/sources.json)。

LC150 以使用者指定的 [wq1supld 題單](https://leetcode.com/problem-list/wq1supld/) 為準，已依新版 [150 題快照](../leetcodetop150.md) 核對本庫 15 題歸屬，詳見 [核對紀錄](top150-audit.md)。

| 來源 | 本次核對範圍 | 狀態 |
|---|---|---|
| [LeetCode 643](https://leetcode.com/problems/maximum-average-subarray-i/) | 題號 643、Maximum Average Subarray I、Easy、固定 k 的最大平均 | verified |
| [Blind 75 原始題單轉載](https://leetcode.com/discuss/post/460599/blind-75-leetcode-questions-by-krishnade-9xev/) | 經作者說明連至原始題單，已確認本庫 3、76、33、11、141、15、198、200、39 共 9 題歸屬 | verified |
| [LC150 指定題單](https://leetcode.com/problem-list/wq1supld/) | 使用者提供的 150 題快照；本庫 15 題名稱、難度及歸屬一致 | verified |

後續每新增題目先查官方題目頁，再查題單；在來源 notes 記錄實際核對的 ID，確認後才新增 collection_source_ids。最低 20 題與六篇代表教學、路徑教材已達標。指定題單 wq1supld 已依使用者提供的完整 150 題快照核對，本庫 15 題已標記歸屬，第 5 步來源驗收完成。
