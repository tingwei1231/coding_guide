# LeetCode 新手引導手冊 — 網站規格文件 v4

## 0. 專案定位

這是一本「上場前的教練手冊」，不是「訓練場」。

- 目標使用者：應屆畢業生、轉職者、準備技術面試的新手
- 核心價值：在打開 LeetCode / HackerRank 之前，先建立「看到題目 → 辨識模式 → 套用模板 → 判斷變形」的完整思考框架
- 明確邊界：
  - ❌ 不做站內線上判題（no online judge / code execution）
  - ❌ 不做使用者登入與帳號系統
  - ❌ 不做進度追蹤資料庫
  - ❌ 不做社群討論區
  - ❌ 不收錄公司標籤
  - ✅ 只做「讀懂 + 辨識 + 模板 + 概念測驗」，實際刷題導向外部 LeetCode 連結
- 架構型態：純靜態網站，無後端伺服器，內容全部以本地 JSON / Markdown 管理

---

## 1. 必要功能模組

### 1.1 資料結構講解 (`/data-structures`)

| 項目 | 內容 |
|---|---|
| 涵蓋範圍 | Array、String、HashMap/Set、LinkedList、Stack、Queue、Heap、Tree (BST/Trie)、Graph、Union-Find |
| 每頁內容 | 定義、時間/空間複雜度表、適用場景、常見誤區、靜態圖解或簡易動畫 |
| 技術需求 | 純前端 SVG/Canvas 動畫（如 Heap sift-up/down、LinkedList 反轉），無需後端 |

### 1.2 多語言對照 (`/languages`)

- 模板與教學提供 C++ / Python / Java 三語言 tab；本語言對照頁採並排比較，手機版垂直排列呈現。
- 「語言差異對照表」：如 Python `heapq` vs Java `PriorityQueue` vs C++ `priority_queue`
- 明確聲明：此區只用於「讀懂寫法」，不內建線上編譯執行器

### 1.3 引導式教學 (`/guided-learning`)

每個代表題的教學流程（取代直接提供答案）：

1. 這題屬於哪個解題模式？如何從題目關鍵字辨識？
2. 暴力解法思路 + 為什麼不夠好
3. 最佳解法的關鍵觀察（Aha moment）
4. 虛擬碼（pseudocode）+ 三語言參考實作
5. 複雜度分析 + 這個模式還能用在哪些題目

結尾固定附「前往 LeetCode 練這題」外部連結，不在站內提供解題框。

### 1.4 資料結構 / 模式模板庫 (`/templates`)

首版標準模板：Binary Search、BFS/DFS、雙指標、Sliding Window、Backtracking、DP。BFS 與 DFS 分開呈現，DP 包含 top-down 與 bottom-up；每種模式可有多個 standard_templates。首版完整變形只交付 Sliding Window 5 種、Binary Search 4 種、Two Pointers 4 種；其餘變形留待後續，不呈現空卡片。

每個模板包含：
- 三語言版本 + 逐行註解
- 「看到題目長怎樣該想到這個模板」辨識說明
- 對應 Blind 75 / LC150 題號清單（純文字 + 外部連結，不收錄題目內容）
- 見第 2 節：模式變形系統（本次新增的核心功能）

---

## 2. 模式變形系統（Pattern Variation System）★核心新增功能

### 2.1 設計邏輯

新手最大的痛點不是「不會背模板」，而是「拿到新題目時看不出它跟哪個模板是同一家人、只是變形」。因此每個 Pattern 頁面採用三層結構：

```
標準模板 (Standard Template)
   └─ 變形觸發條件 (Trigger Signal) ── 題目長怎樣時要考慮這個變形
        └─ 變形手法 (Diff from Standard) ── 從標準模板改哪裡
             └─ 對應題目 (Related Problems) ── 外部連結，不站內收題
```

頁面最上方另設「症狀 → 處方」快速對照表（Symptom-to-Pattern Quick Lookup），供使用者用題目關鍵字反查可能的 pattern + 變形。

### 2.2 各 Pattern 的變形對照內容

#### A. Sliding Window

| 變形 | 辨識訊號 | 跟標準模板差在哪 | 對應題目 |
|---|---|---|---|
| fixed-size window | 「長度為 k 的子陣列」 | window 大小固定，滑動時同時加入右邊、移除左邊 | Maximum Average Subarray I |
| 可變 window（找最長） | 「最長且滿足某條件的子字串」 | 右指標持續擴張，條件破壞才收縮左指標 | Longest Substring Without Repeating Characters |
| 可變 window（找最短） | 「最短且滿足某條件的子陣列」 | 條件一滿足就開始收縮左指標，過程中取最小值 | Minimum Size Subarray Sum |
| window+頻率計數 | 「包含所有字元/異位詞」 | 額外維護 HashMap 記錄 window 內元素頻率 | Minimum Window Substring、Permutation in String |
| window+monotonic deque | 「window 內最大/最小值」 | 用 Deque 維護遞減/遞增序列，避免重新掃描 window | Sliding Window Maximum |

#### B. Binary Search

| 變形 | 辨識訊號 | 跟標準模板差在哪 | 對應題目 |
|---|---|---|---|
| 找確切值 | 陣列已排序，找 target | 標準三段式 l, r, mid | Binary Search（基本題） |
| 找左/右邊界 | 「找第一個/最後一個滿足條件的位置」 | 找到後不馬上 return，繼續往同側收縮 | Find First and Last Position |
| 旋轉陣列 | 「旋轉排序陣列」 | 每次先判斷哪一半有序，再決定 target 落在哪一側 | Search in Rotated Sorted Array |
| 二分答案 | 題目問「最小的最大值」、「最少天數」等最佳化問題，陣列本身不一定排序 | 二分對象是「答案的可能範圍」，配合 check(mid) 判斷可行性 | Koko Eating Bananas、Capacity To Ship Packages |

> 備註：二分答案是新手最常卡住的變形，因為表面看不出跟 Binary Search 有關，是引導內容需重點著墨處。

#### C. Two Pointers

| 變形 | 辨識訊號 | 跟標準模板差在哪 | 對應題目 |
|---|---|---|---|
| 對撞指標 | 排序陣列找兩數關係；或可證明兩端淘汰規則 | Two Sum II 利用排序；Container With Most Water 利用短邊限制，並不要求排序 | Two Sum II、Container With Most Water |
| 快慢指標 | 鏈結串列、找環、找中點 | 兩指標同起點不同速度 | Linked List Cycle、Middle of Linked List |
| 三指標/多指標 | 「三數之和」類題目 | 固定外層指標 + 內層對撞指標 | 3Sum |
| 原地分割 | 「移除元素」、「移動零」 | 一個指標負責寫入位置，一個指標負責掃描 | Move Zeroes、Remove Duplicates |

#### D. BFS / DFS（未來可擴充，建議收錄方向）

| 變形 | 辨識訊號 | 差異 | 對應題目 |
|---|---|---|---|
| 樹的層序遍歷 | 「按層輸出」、「每層平均/最大值」 | BFS + 記錄每層節點數量 | Binary Tree Level Order Traversal |
| 圖的連通分量 | 「島嶼數量」、「群組數量」 | DFS/BFS + visited 標記，計算觸發次數 | Number of Islands |
| 拓撲排序 | 「先修課程」、「依賴順序」 | BFS + 入度計算（Kahn's Algorithm） | Course Schedule |
| 雙向 BFS | 「最短轉換序列」且狀態空間大 | 從起點與終點同時展開，減少搜尋空間 | Word Ladder |

#### E. Backtracking（未來可擴充，建議收錄方向）

| 變形 | 辨識訊號 | 差異 | 對應題目 |
|---|---|---|---|
| 排列 (Permutation) | 「所有排列方式」，順序有差 | 每層選未用過的元素，用 used[] 陣列 | Permutations |
| 組合 (Combination) | 「所有組合方式」，順序無差 | 每層只往後選，避免重複組合 | Combinations、Subsets |
| 含重複元素剪枝 | 「元素可能重複，但結果不可重複」 | 先排序，同層跳過重複值 | Subsets II、Permutations II |
| 條件式剪枝 | 「總和等於 target」類限制 | 提前終止不可能的分支 | Combination Sum |

#### F. Dynamic Programming（未來可擴充，建議收錄方向）

| 變形 | 辨識訊號 | 差異 | 對應題目 |
|---|---|---|---|
| 一維 DP | 「第 n 步/個的最佳值」 | dp[i] 只依賴前面幾個狀態 | Climbing Stairs、House Robber |
| 二維 DP（雙序列） | 兩個字串/陣列的比較關係 | dp[i][j] 表示兩序列前 i, j 個的關係 | Longest Common Subsequence |
| 背包型 DP | 「容量限制下的最佳組合」 | 0/1 背包每物品最多一次；Coin Change 允許重複取用，轉移與迭代方向須分開說明 | 0/1 Knapsack、Coin Change |
| 區間 DP | 「一段區間的最佳切法/合併方式」 | dp[i][j] 表示區間 i~j 的最佳解 | Burst Balloons |

### 2.3 資料契約與正式 JSON Schema

以 [資料契約](data-contracts.md) 與 `../schemas/*.schema.json` 為準；舊版內嵌 JSON 範例已移除。

- 每種模式一份 JSON，包含多個標準模板、變形、三語言程式碼、前提、反例、複雜度及解說。
- 每個變形指定同模式內的基礎模板 ID，提供完整程式碼與各語言從 1 起算的高亮行號；刪除內容以文字補充。
- 題目、來源、教材與測驗均有穩定 ID。題目索引包含題號、難度、模式及已核對的題單歸屬；各頁引用 ID。
- JSON Schema 驗證型別與必填欄位；驗證程式檢查重複 ID、跨檔引用、高亮行號範圍及教材檔案。
- 辨識訊號只是線索，教學必須證明適用前提：sliding window 的增減性與負數反例；二分答案的搜尋範圍及可行性單調性；雙指標的淘汰依據；DP 是否可重複選取。

### 2.4 頁面呈現規則

- 頁面上方：標準模板（語言 tab 切換：C++ / Python / Java）
- 下方：變形卡片，以手風琴（accordion）方式展開，展開內容包含：
  - 辨識訊號（關鍵字以醒目顏色標示）
  - Code diff 呈現：預設顯示新增／修改行與必要上下文，可切換完整程式碼；刪除內容另以文字說明。結構差異大時允許解說整體變化，不假設所有變形只改少數行。
  - 對應題目清單（外部連結至 LeetCode，不站內收題）
- 頁面最上方提供跨模式／變形搜尋，兩層各設 keywords；trim、英文字母轉小寫、空白分詞，多詞 OR 子字串比對。完整關鍵字匹配優先，再以變形匹配優先，同順位依 ID 排序。空輸入顯示分類，無結果提供建議詞；結果附匹配理由、前提，並可直接展開變形。

---

## 3. 其他銜接內容模組

### 3.1 學習路徑地圖 (`/roadmap`)
- 純內容導覽，無帳號/進度追蹤
- 依主題分類呈現建議學習順序（Array/雙指標 → Sliding Window → BFS/DFS → Backtracking → DP...）
- 每分類列出 Blind 75 / LC150 對應題目「清單」（題名 + 難度 + 所屬 pattern + 外部連結）

### 3.2 概念驗證測驗 (`/quiz`)（取代原每日/每週挑戰）
- 形式：填空題 + 選擇題，測「概念理解」而非「解題能力」
- 範例：
  - 填空：「排序陣列中找兩數之和 target，優先考慮 ___ 模式」→ 雙指標
  - 選擇：「以下哪個時間複雜度最適合描述 Binary Search？」
  - 挖空模板：給一段 BFS 模板程式碼，挖空關鍵行讓使用者填入
- 技術需求：純前端 JS 邏輯，題庫存於本地 JSON，作答狀態存在記憶體（reload 即重置），不儲存作答紀錄
- 題庫可隨機抽題組合，模擬「每日一練」體感但無需後端

### 3.3 模擬面試「思路」練習 (`/mock-interview`)
- 白板口頭表達模式：給情境題，引導使用者練習「先講思路、再講複雜度」，不要求真的寫程式送出
- 常見行為面試題（Behavioral Questions）+ STAR 法則說明與範例
- 技術面試流程說明：面試官想看什麼、如何溝通卡關、如何主動提出 trade-off

### 3.4 履歷與求職銜接資源 (`/career-prep`)
- 技術履歷撰寫指南（新鮮人常見錯誤）
- GitHub / Portfolio 專案建議清單
- 面試前一週 / 前一天準備 checklist

### 3.5 Big O 複雜度分析教學 (`/big-o`)
- 教學重點：如何在面試中口頭推導、表達時間/空間複雜度
- 用範例題目示範分析過程（非站內解題）

---

## 4. 網站資訊架構 (Sitemap)

```
/                        首頁：定位說明 + 快速導覽
/data-structures         資料結構講解
/languages                三語言差異對照
/templates                模式模板庫（含變形系統）
  /templates/sliding-window
  /templates/binary-search
  /templates/two-pointers
  /templates/bfs-dfs
  /templates/backtracking
  /templates/dp
/guided-learning          引導式教學（代表題拆解）
/roadmap                  學習路徑地圖
/quiz                     概念驗證測驗
/mock-interview           模擬面試思路練習
/career-prep              履歷與求職準備
/big-o                    複雜度分析教學
```

---

## 5. 技術架構

| 項目 | 建議方案 |
|---|---|
| 前端框架 | React + TypeScript + Vite + React Router，純靜態網站 |
| 內容管理 | Markdown（教學文章）+ JSON（模板、變形資料、測驗題庫） |
| 程式碼顯示 | Shiki，只顯示程式碼 |
| 動畫呈現 | 純前端 SVG / Canvas，或輕量函式庫（如 Framer Motion） |
| 測驗功能 | 純前端 JS 邏輯，狀態存於 React state / Vue reactive，無資料庫 |
| 部署 | 首選 Vercel 靜態託管，設定子路由 fallback；直接開啟及重新整理須正常 |

明確排除：使用者登入系統、資料庫、線上編譯執行器（如 Judge0）、進度追蹤後端、社群討論區、公司標籤系統。

---

## 6. 需求異動紀錄

| 版本 | 異動內容 |
|---|---|
| v1 | 初版大綱，含刷題平台功能（線上執行器、進度追蹤、社群） |
| v2 | 改為「引導手冊」定位：移除社群、公司標籤、登入系統；每日/週挑戰改為無狀態的填空/選擇題測驗 |
| v3 | 新增「模式變形系統」：Sliding Window、Binary Search、Two Pointers 三個 pattern 完整收錄變形對照表，BFS/DFS、Backtracking、DP 列為擴充方向；補充 JSON 資料模型與頁面呈現規則 |
| v4（本版） | 統一三語言呈現與首版範圍，建立正式資料契約及驗證；補齊變形程式碼、搜尋與題目索引，定義教學前提、內容數量及操作驗收 |

---

## 7. 後續實作順序

1. 資料契約與範例已完成，依 plan 第 2 步建立 React 靜態網站骨架。
2. 依第 3 步補齊 Sliding Window 5 種變形並製作頁面原型，驗證標準模板、accordion 與 code diff。
3. 依第 4 步完成跨模式搜尋、其餘首版標準模板與指定變形，再按第 5～8 步完成教材及整合驗收。

## 8. v4 完成標準與驗收

v4 整合模式範圍、三語言呈現、正式 Schema、變形程式碼、搜尋資料、題目索引及教學前提修正。內容最低數量依 [plan.md 的首版內容完成標準](plan.md#首版內容完成標準)；逐頁工作項目與狀態以 [內容清單](content-inventory.md) 及 `../content/catalog.json` 為準。

- 題單中的 LC150 依使用者於 2026-09-29 指示，改以 https://leetcode.com/problem-list/wq1supld/ 為準（取代原 Top Interview 150 studyplan）；不承諾首版完整收錄兩份題單，歸屬需逐題核實。
- 測驗包含選擇、文字填空、程式碼填空；以可接受答案清單比對，不執行程式；每題提供解說與誤解，狀態只存在記憶體。
- 手機版程式碼不造成整頁橫向溢出；tab、accordion 與測驗支援鍵盤操作與清楚的焦點樣式。
- 靜態部署須支援子路由直接開啟、重新整理與應用程式 404。
- 第一階段驗收是資料契約與有效範例，不代表所有教材已完成；實作順序依 plan.md。
