先辨識題型 → 選模板 → 定義不變量 → 檢查邊界。本頁依提供的 `leetcode-150-pattern-templates.md` 統整；相同 Pattern 採用該文件的核心骨架，已有完整實作則直接連結，避免重複。

## Pattern 快速索引

| Pattern | 題目訊號／核心不變量 | 模板 |
|---|---|---|
| Two Pointers | sorted + pair／排除區域不再含答案；原地修改／有效前綴 | [左右夾逼](/templates/two-pointers)；[原地壓縮](/templates/two-pointers) |
| Sliding Window | 連續區間／左右界維持合法條件 | [可變長度、最長與最短](/templates/sliding-window) |
| Hash Map / Set | 查找、頻率、去重／記錄已處理元素 | [Complement Lookup](/templates/hashmap-set)；[Frequency Map](/data-structures/hashmap-set) |
| Prefix Sum | 區間和／prefix[i] 是前 i 個元素的累加 | [區間和](/templates/prefix-sum)；[Prefix + HashMap](/templates/hashmap-set) |
| Binary Search | 單調搜尋空間／答案留在未淘汰區間 | [確切值、第一個 true](/templates/binary-search) |
| Interval | 重疊、合併／排序後維護已合併區間 | [Merge 模板](/templates/intervals) |
| Stack | 配對、巢狀／未處理元素依 LIFO 排列 | [括號配對](/templates/stack) |
| Monotonic Stack | next / previous greater / smaller／維持指定單調性 | [遞增 stack](/templates/monotonic-stack) |
| Linked List | 反轉、合併、刪除／改 next 前保存原鏈結 | [反轉](/templates/linked-list)；dummy node |
| Fast & Slow Pointers | 環、中點／固定相對速度 | [環偵測](/templates/linked-list) |
| Tree DFS | 子樹、路徑／每次回傳明確的子問題資訊 | [Bottom-Up DFS](/templates/bfs-dfs) |
| Tree BFS | 層序／本輪只處理固定的一層 | [Level Order](/templates/bfs-dfs) |
| BST | 有序樹／祖先上下界或中序遞增 | [上下界驗證](/templates/bst) |
| Graph DFS / BFS | 連通、可達／每個節點只訪問一次 | [鄰接表走訪](/templates/bfs-dfs) |
| Grid DFS / Flood Fill | 格子連通／標記後不再訪問 | [四方向 DFS](/templates/bfs-dfs) |
| Topological Sort | dependency／入度 0 才能處理 | [Kahn 模板](/templates/topological-sort) |
| Trie | prefix、字典查詢／路徑代表字首 | [insert / search](/templates/trie) |
| Backtracking | 所有組合、排列／path 是目前有效選擇 | [choose → recurse → undo](/templates/backtracking) |
| Heap | Top K、動態最值／只保留合格候選 | [容量 k 的 min heap](/templates/heap) |
| Greedy | 局部最優／已做選擇不破壞最佳解 | [證明與 Jump Game](/templates/greedy) |
| 1D DP | 前綴、選／不選／dp[i] 有固定語意 | [狀態與轉移](/templates/dp) |
| 2D DP | grid、兩字串／狀態由兩維決定 | [LCS](/templates/dp) |
| Kadane | 最大連續和／current 必須以目前位置結尾 | [重新開始或延續](/templates/dp) |
| Bit Manipulation | XOR、位元計數／位元代數 | [XOR / set bits](/templates/bit-manipulation) |
| Matrix Simulation | 矩陣走訪／方向、邊界、順序 | [鄰居骨架](/templates/matrix-simulation) |

## 套用前的四個問題

1. 答案是 pair、區間、路徑，還是所有組合？
2. 有序、單調、連續、依賴等條件是否成立？
3. 模板維護什麼狀態？每次更新後要保證什麼？
4. 空輸入、相等值、溢位與資料規模會不會破壞前提？

## 常用 Pattern 組合

| 組合 | 要修改的狀態 |
|---|---|
| Prefix Sum + HashMap | 查找 sum − target，再記錄當前 prefix 次數 |
| DFS + Backtracking | 路徑探索後撤銷 visited／path |
| Trie + DFS | 用字首是否存在剪枝 |
| Binary Search + Greedy / Check | 二分答案，check 必須具有單調性 |
| Heap + Linked List | 每條有序串列只放目前最小候選，彈出後補 next |
| Tree DFS + Global Answer | 回傳可延伸的局部資訊，另外更新全域最佳 |
| Sort + Two Pointers | 排序後以單調性排除候選，留意原始索引 |
| Graph + Indegree | 以未完成的依賴數決定處理順序 |

## 文件建議優先級

| 優先級 | Pattern |
|---|---|
| Tier 1：基礎必熟 | Hash Map / Set、Two Pointers、Sliding Window、Binary Search、Stack、Linked List、Tree / Graph DFS / BFS、Backtracking、1D / 2D DP |
| Tier 2：高頻進階 | Prefix Sum、Interval、Heap、Greedy、Topological Sort、Monotonic Stack、BST |
| Tier 3：專門題型 | Trie、Bit Manipulation、Kadane、Matrix Simulation、Fast & Slow Pointers |

此處是新文件的通用面試學習順序；[刷題順序](/practice-order)保留兩週 HackerRank 的每日安排。
