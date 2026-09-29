## 六個階段，建立可以說出口的思路

這是一份教材導覽，不儲存學習進度。每階段先補先備知識，再讀引導教學、比較模板，最後到外部平台練習。速度依自己的理解程度調整，無須一天完成一階段。

表中的 Blind 75 歸屬已依[作者連結的題單](https://leetcode.com/discuss/post/460599/blind-75-leetcode-questions-by-krishnade-9xev/)核對。「補充練習」只表示本站未聲明題單歸屬。LC150 以[指定題單](https://leetcode.com/problem-list/wq1supld/)為準，已依 2026-09-29 使用者提供的完整 150 題快照核對；此處的 LC150 不指先前的 Top Interview 150 studyplan。

## 1. Array 與雙指標

#### 先備知識

理解索引、陣列與排序；先能手動走訪陣列。

#### 學習目標

能說明移動哪個端點，以及淘汰後為什麼不漏解。

依序閱讀[基礎補充](/data-structures/array) → [代表題教學](/guided-learning/two-pointers) → [模式模板](/templates/two-pointers)。

| 題目 | 難度 | 模式 | 題單 |
|---|---|---|---|
| [167. Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) | medium | Array 與雙指標 | LC150（指定題單） |
| [11. Container With Most Water](https://leetcode.com/problems/container-with-most-water/) | medium | Array 與雙指標 | Blind 75、LC150（指定題單） |
| [15. 3Sum](https://leetcode.com/problems/3sum/) | medium | Array 與雙指標 | Blind 75、LC150（指定題單） |

#### 完成檢查

不看程式，用一個小例子追蹤狀態，再說明時間、額外空間與不適用的反例。

## 2. Sliding Window

#### 先備知識

熟悉陣列／字串、左右指標與簡單頻率表。

#### 學習目標

區分固定、找最長與找最短 window，說清楚記答案的時機。

依序閱讀[基礎補充](/data-structures/string) → [代表題教學](/guided-learning/sliding-window) → [模式模板](/templates/sliding-window)。

| 題目 | 難度 | 模式 | 題單 |
|---|---|---|---|
| [643. Maximum Average Subarray I](https://leetcode.com/problems/maximum-average-subarray-i/) | easy | Sliding Window | 補充練習 |
| [209. Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/) | medium | Sliding Window | 補充練習 |
| [3. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/) | medium | Sliding Window | Blind 75、LC150（指定題單） |
| [76. Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/) | hard | Sliding Window | Blind 75、LC150（指定題單） |

#### 完成檢查

不看程式，用一個小例子追蹤狀態，再說明時間、額外空間與不適用的反例。

## 3. Binary Search

#### 先備知識

理解已排序陣列、區間邊界與布林條件。

#### 學習目標

能維護半開／閉區間，並為二分答案證明可行性單調。

依序閱讀[基礎補充](/big-o) → [代表題教學](/guided-learning/binary-search) → [模式模板](/templates/binary-search)。

| 題目 | 難度 | 模式 | 題單 |
|---|---|---|---|
| [704. Binary Search](https://leetcode.com/problems/binary-search/) | easy | Binary Search | LC150（指定題單） |
| [33. Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/) | medium | Binary Search | Blind 75、LC150（指定題單） |
| [875. Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/) | medium | Binary Search | LC150（指定題單） |

#### 完成檢查

不看程式，用一個小例子追蹤狀態，再說明時間、額外空間與不適用的反例。

## 4. BFS / DFS

#### 先備知識

認識圖的節點、邊、queue 與 visited。

#### 學習目標

以格子地圖找連通區域，並解釋何時標記、哪些格子會被訪問。

依序閱讀[基礎補充](/data-structures/graph) → [代表題教學](/guided-learning/bfs-dfs) → [模式模板](/templates/bfs-dfs)。

| 題目 | 難度 | 模式 | 題單 |
|---|---|---|---|
| [200. Number of Islands](https://leetcode.com/problems/number-of-islands/) | medium | BFS / DFS | Blind 75、LC150（指定題單） |

#### 完成檢查

不看程式，用一個小例子追蹤狀態，再說明時間、額外空間與不適用的反例。

## 5. Backtracking

#### 先備知識

熟悉遞迴、stack 與陣列複製。

#### 學習目標

能描述選擇、深入、撤銷，分辨索引去重與值去重。

依序閱讀[基礎補充](/data-structures/stack) → [代表題教學](/guided-learning/backtracking) → [模式模板](/templates/backtracking)。

| 題目 | 難度 | 模式 | 題單 |
|---|---|---|---|
| [78. Subsets](https://leetcode.com/problems/subsets/) | medium | Backtracking | LC150（指定題單） |
| [39. Combination Sum](https://leetcode.com/problems/combination-sum/) | medium | Backtracking | Blind 75、LC150（指定題單） |

#### 完成檢查

不看程式，用一個小例子追蹤狀態，再說明時間、額外空間與不適用的反例。

## 6. Dynamic Programming

#### 先備知識

能寫出遞迴狀態與基本情況，了解重複子問題。

#### 學習目標

說出狀態的完整意義，先推導轉移，再討論 memoization 或壓縮。

依序閱讀[基礎補充](/big-o) → [代表題教學](/guided-learning/dp) → [模式模板](/templates/dp)。

| 題目 | 難度 | 模式 | 題單 |
|---|---|---|---|
| [198. House Robber](https://leetcode.com/problems/house-robber/) | medium | Dynamic Programming | Blind 75、LC150（指定題單） |

#### 完成檢查

不看程式，用一個小例子追蹤狀態，再說明時間、額外空間與不適用的反例。

## 遇到卡關時

先回到[資料結構](/data-structures)確認操作成本，或到[語言對照](/languages)確認語法。能解出一題之後，用[模板搜尋](/templates)比較相近變形，避免只記住題目外觀。
