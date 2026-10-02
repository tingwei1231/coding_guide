## 兩週 LeetCode 刷題計畫

> **目標**：兩週內提升 HackerRank 解題正確率與速度。  
> **語言**：C++  
> **目前程度**：基本資料結構熟悉，但看到題目時不容易立即辨識 Pattern，知道解法後也容易卡在實作。  
> **核心策略**：不追求刷完 NeetCode 150，而是優先把高頻 Pattern 練到「看到題目 → 辨識 Pattern → 套 Template → 修改完成」。

閱讀入口：[C++ 高頻模板複習](/templates/cpp-review) · [模式模板](/templates) · [引導教學](/guided-learning)

---

## 0. C++ 考試常用 STL

兩週內建議至少熟悉：

```cpp
#include <bits/stdc++.h>
using namespace std;
```

| 用途 | STL |
|---|---|
| HashMap | `unordered_map` |
| HashSet | `unordered_set` |
| Stack | `stack` |
| Queue | `queue` |
| Deque | `deque` |
| Min / Max Heap | `priority_queue` |
| Dynamic Array | `vector` |
| Pair | `pair` |
| Sorting | `sort()` |

常用操作：

```cpp
vector<int> nums;
unordered_map<int, int> mp;
unordered_set<int> st;
stack<int> s;
queue<int> q;
priority_queue<int> maxHeap;
priority_queue<int, vector<int>, greater<int>> minHeap;

sort(nums.begin(), nums.end());
```

---

## 1. Tier List 總覽

### S Tier｜最高優先級

這些題型是兩週內最需要建立肌肉記憶的。

1. Array
2. HashMap / HashSet
3. String
4. Two Pointers
5. Sliding Window
6. Stack
7. Binary Search
8. Tree DFS / BFS
9. Graph DFS / BFS
10. Heap / Priority Queue

### A Tier｜第二優先級

S Tier 穩定後再進入。

1. Linked List
2. Prefix Sum
3. Sorting
4. Backtracking
5. Basic Dynamic Programming
6. Graph / Topological Sort

### B Tier｜有時間再補

兩週內不要投入太多時間。

1. Trie
2. Union Find
3. Bit Manipulation
4. Advanced Dynamic Programming
5. Advanced Graph
6. Segment Tree / Fenwick Tree

---

## 2. S Tier 刷題順序

## S1｜Array + HashMap / HashSet

[閱讀對應教材與模板](/data-structures/hashmap-set)

### 必練 Pattern

看到以下關鍵字，優先想到 HashMap / HashSet：

- 查某個值是否存在
- 查某個值出現幾次
- 查某個值的位置
- Two Sum
- Duplicate
- Frequency
- Group

### 建議題目

| 優先 | 題目 | 目的 |
|---|---|---|
| ⭐⭐⭐ | Two Sum | HashMap 基本模板 |
| ⭐⭐⭐ | Contains Duplicate | HashSet |
| ⭐⭐⭐ | Valid Anagram | Frequency Counting |
| ⭐⭐⭐ | Group Anagrams | HashMap + String |
| ⭐⭐⭐ | Top K Frequent Elements | HashMap + Heap |
| ⭐⭐ | Longest Consecutive Sequence | HashSet |

### C++ 必熟模板

```cpp
unordered_map<int, int> mp;
unordered_set<int> st;

mp[key] = value;
mp.find(key);
mp.count(key);
mp[key]++;

st.insert(x);
st.count(x);
```

---

## S2｜Two Pointers

[閱讀對應教材與模板](/templates/two-pointers)

### 題目訊號

看到：

- Sorted Array
- Pair
- Palindrome
- Left / Right
- 從兩側往中間

優先想到 Two Pointers。

### 建議題目

| 優先 | 題目 | 目的 |
|---|---|---|
| ⭐⭐⭐ | Valid Palindrome | 基礎 |
| ⭐⭐⭐ | Two Sum II | Sorted Array + Two Pointers |
| ⭐⭐⭐ | 3Sum | Two Pointers 變形 |
| ⭐⭐⭐ | Container With Most Water | Two Pointers 思維 |
| ⭐⭐ | Trapping Rain Water | 進階 Two Pointers |

### C++ 模板

```cpp
int left = 0;
int right = static_cast<int>(nums.size()) - 1;

while (left < right) {

    if (...) {
        left++;
    } else {
        right--;
    }
}
```

---

## S3｜Sliding Window

[閱讀對應教材與模板](/templates/sliding-window)

### 題目訊號

看到：

- Substring
- Subarray
- Contiguous
- Longest
- Shortest
- At most K
- Without repeating

優先想到 Sliding Window。

### 建議題目

| 優先 | 題目 | 目的 |
|---|---|---|
| ⭐⭐⭐ | Best Time to Buy and Sell Stock | 基礎 Window / One Pass |
| ⭐⭐⭐ | Longest Substring Without Repeating Characters | 核心題 |
| ⭐⭐⭐ | Longest Repeating Character Replacement | Window + Frequency |
| ⭐⭐⭐ | Permutation in String | Window + Frequency |
| ⭐⭐ | Minimum Window Substring | 進階 |

### C++ 模板

```cpp
int left = 0;

for (int right = 0; right < nums.size(); right++) {

    // 加入 nums[right]

    while (condition) {
        // 移除 nums[left]
        left++;
    }

    // 更新答案
}
```

---

## S4｜Stack / Monotonic Stack

[閱讀對應教材與模板](/templates/cpp-review)

### 題目訊號

看到：

- Matching
- Parentheses
- Next Greater
- Previous Greater
- Monotonic

優先想到 Stack。

### 建議題目

| 優先 | 題目 | 目的 |
|---|---|---|
| ⭐⭐⭐ | Valid Parentheses | Stack 基礎 |
| ⭐⭐⭐ | Min Stack | Stack 設計 |
| ⭐⭐⭐ | Evaluate Reverse Polish Notation | Stack |
| ⭐⭐⭐ | Daily Temperatures | Monotonic Stack |
| ⭐⭐ | Car Fleet | Stack / Monotonic 思維 |

### C++ 模板

```cpp
stack<int> st;

st.push(x);
st.pop();
st.top();
st.empty();
```

> C++ 使用 `std::stack`，需要雙端操作時使用 `std::deque`；`ArrayDeque` 是 Java 的類別。

---

## S5｜Binary Search

[閱讀對應教材與模板](/templates/binary-search)

### 題目訊號

看到：

- Sorted
- Search
- Find minimum / maximum
- Search space
- Minimum possible value
- Maximum possible value

優先想到 Binary Search。

### 建議題目

| 優先 | 題目 | 目的 |
|---|---|---|
| ⭐⭐⭐ | Binary Search | 必熟模板 |
| ⭐⭐⭐ | Search a 2D Matrix | 基礎變形 |
| ⭐⭐⭐ | Koko Eating Bananas | Binary Search on Answer |
| ⭐⭐⭐ | Find Minimum in Rotated Sorted Array | 變形 |
| ⭐⭐⭐ | Search in Rotated Sorted Array | 變形 |
| ⭐⭐ | Time Based Key-Value Store | Binary Search |

### C++ 模板

```cpp
int left = 0;
int right = static_cast<int>(nums.size()) - 1;

while (left <= right) {

    int mid = left + (right - left) / 2;

    if (nums[mid] == target) {
        return mid;
    } else if (nums[mid] < target) {
        left = mid + 1;
    } else {
        right = mid - 1;
    }
}

return -1;
```

---

## S6｜Tree DFS / BFS

[閱讀對應教材與模板](/templates/bfs-dfs)

### 題目訊號

看到：

- Binary Tree
- Root
- Left / Right
- Level
- Depth
- Path
- Subtree

優先想到 DFS / BFS。

### 建議題目

| 優先 | 題目 | 目的 |
|---|---|---|
| ⭐⭐⭐ | Maximum Depth of Binary Tree | DFS |
| ⭐⭐⭐ | Invert Binary Tree | DFS |
| ⭐⭐⭐ | Same Tree | DFS |
| ⭐⭐⭐ | Binary Tree Level Order Traversal | BFS |
| ⭐⭐⭐ | Validate Binary Search Tree | DFS |
| ⭐⭐⭐ | Lowest Common Ancestor of a Binary Search Tree | Tree |
| ⭐⭐ | Kth Smallest Element in a BST | BST + DFS |

### DFS 模板

```cpp
void dfs(TreeNode* node) {

    if (node == nullptr) {
        return;
    }

    dfs(node->left);
    dfs(node->right);
}
```

### BFS 模板

```cpp
queue<TreeNode*> q;

if (root != nullptr) {
    q.push(root);
}

while (!q.empty()) {

    TreeNode* node = q.front();
    q.pop();

    if (node->left != nullptr) {
        q.push(node->left);
    }

    if (node->right != nullptr) {
        q.push(node->right);
    }
}
```

---

## S7｜Graph DFS / BFS

[閱讀對應教材與模板](/guided-learning/bfs-dfs)

### 題目訊號

看到：

- Graph
- Connected
- Island
- Reachable
- Path
- Visited
- Neighbor
- Grid

優先想到 DFS / BFS。

### 建議題目

| 優先 | 題目 | 目的 |
|---|---|---|
| ⭐⭐⭐ | Number of Islands | Grid DFS/BFS |
| ⭐⭐⭐ | Flood Fill | DFS/BFS |
| ⭐⭐⭐ | Clone Graph | Graph DFS/BFS |
| ⭐⭐⭐ | Rotting Oranges | Multi-source BFS |
| ⭐⭐⭐ | Course Schedule | Graph / Topological Sort |
| ⭐⭐ | Pacific Atlantic Water Flow | DFS |

### DFS 模板

```cpp
void dfs(int r, int c) {

    if (r < 0 || r >= rows ||
        c < 0 || c >= cols ||
        visited[r][c]) {
        return;
    }

    visited[r][c] = true;

    for (auto& dir : directions) {
        dfs(r + dir[0], c + dir[1]);
    }
}
```

### BFS 模板

```cpp
queue<pair<int, int>> q;

q.push({startR, startC});

while (!q.empty()) {

    auto [r, c] = q.front();
    q.pop();

    for (auto& dir : directions) {
        // 計算 next row / col
        // 檢查是否 visited
        // 加入 queue
    }
}
```

---

## S8｜Heap / Priority Queue

[閱讀對應教材與模板](/templates/cpp-review)

### 題目訊號

看到：

- Top K
- Kth Largest
- Kth Smallest
- Closest K
- Priority
- Streaming

優先想到 Heap。

### 建議題目

| 優先 | 題目 | 目的 |
|---|---|---|
| ⭐⭐⭐ | Kth Largest Element in an Array | Heap |
| ⭐⭐⭐ | Top K Frequent Elements | HashMap + Heap |
| ⭐⭐⭐ | K Closest Points to Origin | Heap |
| ⭐⭐ | Find Median from Data Stream | Two Heaps |

### C++ 模板

```cpp
// Min Heap
priority_queue<int, vector<int>, greater<int>> minHeap;

// Max Heap
priority_queue<int> maxHeap;

minHeap.push(x);
minHeap.pop();
minHeap.top();

maxHeap.push(x);
maxHeap.pop();
maxHeap.top();
```

---

## 3. A Tier 刷題順序

## A1｜Linked List

[閱讀對應教材與模板](/templates/cpp-review)

### 建議題目

1. Reverse Linked List ⭐⭐⭐
2. Merge Two Sorted Lists ⭐⭐⭐
3. Linked List Cycle ⭐⭐⭐
4. Remove Nth Node From End of List ⭐⭐⭐
5. Reorder List ⭐⭐
6. Add Two Numbers ⭐⭐

### 必熟

```cpp
ListNode* prev = nullptr;
ListNode* curr = head;

while (curr != nullptr) {

    ListNode* next = curr->next;

    curr->next = prev;

    prev = curr;
    curr = next;
}

return prev;
```

---

## A2｜Prefix Sum

[閱讀對應教材與模板](/templates/cpp-review)

### 題目訊號

看到：

- Range Sum
- Subarray Sum
- Cumulative
- Multiple range queries
- Sum equals K

### 建議題目

1. Running Sum of 1d Array
2. Range Sum Query - Immutable
3. Subarray Sum Equals K ⭐⭐⭐
4. Product of Array Except Self ⭐⭐⭐

---

## A3｜Sorting

[閱讀對應教材與模板](/templates/cpp-review)

### 建議題目

1. Sort an Array
2. Merge Intervals ⭐⭐⭐
3. Insert Interval ⭐⭐
4. Non-overlapping Intervals ⭐⭐
5. Meeting Rooms / Meeting Rooms II

### 題目訊號

看到：

- Interval
- Meeting
- Schedule
- Overlap
- Merge

優先想到：

> Sort → Iterate / Two Pointers

---

## A4｜Backtracking

[閱讀對應教材與模板](/templates/backtracking)

### 題目訊號

看到：

- All combinations
- All permutations
- All subsets
- Generate
- Choose
- Combination

### 建議題目

1. Subsets ⭐⭐⭐
2. Permutations ⭐⭐⭐
3. Combination Sum ⭐⭐⭐
4. Letter Combinations of a Phone Number ⭐⭐
5. Word Search ⭐⭐

### Template

```cpp
void backtrack(...) {

    if (condition) {
        result.push_back(...);
        return;
    }

    for (...) {

        // choose

        backtrack(...);

        // undo
    }
}
```

---

## A5｜Basic Dynamic Programming

[閱讀對應教材與模板](/templates/dp)

兩週內只需要先掌握常見 1D DP。

### 建議題目

1. Climbing Stairs ⭐⭐⭐
2. Min Cost Climbing Stairs ⭐⭐
3. House Robber ⭐⭐⭐
4. Coin Change ⭐⭐⭐
5. Longest Increasing Subsequence ⭐⭐

### 判斷訊號

看到：

- Maximum / Minimum
- Number of ways
- Repeated subproblem
- Previous state
- Choose / Skip

可以開始思考 DP。

---

## 4. B Tier｜有時間再做

## Trie

- Implement Trie
- Design Add and Search Words Data Structure

## Union Find

- Number of Provinces
- Redundant Connection

## Bit Manipulation

- Single Number
- Number of 1 Bits
- Counting Bits

## Advanced DP

- Word Break
- Longest Common Subsequence
- Partition Equal Subset Sum

## Advanced Graph

- Network Delay Time
- Cheapest Flights Within K Stops
- Min Cost to Connect All Points

## Segment Tree / Fenwick Tree

兩週 HackerRank 準備期間可暫時跳過。

---

## 5. 14 天建議刷題順序

| Day | 主題 | 建議題數 | 重點 |
|---|---|---:|---|
| Day 1 | HashMap / HashSet | 5~6 | 建立 Pattern |
| Day 2 | Two Pointers | 4~5 | Template |
| Day 3 | Sliding Window | 4~5 | Template |
| Day 4 | Stack | 4~5 | Stack / Monotonic Stack |
| Day 5 | Binary Search | 4~5 | Binary Search Template |
| Day 6 | Linked List | 4~5 | Pointer 操作 |
| Day 7 | Tree DFS / BFS | 5~6 | Recursive + Queue |
| Day 8 | Heap / Priority Queue | 4~5 | Top K |
| Day 9 | Graph DFS / BFS | 4~5 | Visited |
| Day 10 | Backtracking | 4 | Recursive Template |
| Day 11 | Prefix Sum + Sorting | 4~5 | Subarray / Interval |
| Day 12 | Basic DP | 4~5 | 1D DP |
| Day 13 | Mixed Mock | 2~3 組 | 限時 |
| Day 14 | Mixed Mock + 弱點 | 2~3 組 | 考試模擬 |

---

## 6. 每天的刷題流程

## 第一階段：Template Review｜20~30 分鐘

不看答案寫出：

- HashMap
- Two Pointers
- Sliding Window
- Stack
- Binary Search
- DFS
- BFS
- Heap
- Backtracking

當天沒有全部用到的 Template 不需要全部複習，可以針對目前主題複習。

---

## 第二階段：新題｜60~90 分鐘

每題採用：

### 0～5 分鐘

自己判斷：

```text
1. 題目要求什麼？
2. Brute Force 是什麼？
3. 有沒有更快的方法？
4. 哪個 Pattern？
5. 哪個資料結構？
```

### 5～15 分鐘

如果知道 Pattern，但不知道怎麼實作：

- 看 Hint
- 看 Pattern
- 不要直接看完整 Code

### 15～30 分鐘

自己完成 Code。

如果仍然完全卡住，再看 Solution。

---

## 第三階段：錯題重寫｜30~60 分鐘

每題完成後分類：

### ❌ A：Pattern 不知道

例如：

```text
看到題目完全不知道 Sliding Window
```

### ⚠️ B：知道 Pattern，但 Code 寫不出來

例如：

```text
知道是 Sliding Window
但 while condition 寫不出來
```

### ✅ C：知道且可以完成

例如：

```text
5~15 分鐘完成
```

**兩週內最需要消滅的是 B 類。**

---

## 7. 題目不要只做一次

推薦採用：

```text
第一次
理解 Pattern
    ↓
第二次（隔 1 天）
不看答案重寫
    ↓
第三次（隔 3～4 天）
限時重寫
    ↓
第四次（考試前）
快速確認
```

例如：

```text
Day 1
Two Sum

Day 2
Two Sum 重寫

Day 5
Two Sum 限時 5 分鐘

Day 13
Two Sum 快速重寫
```

目標是把：

> 「我看過這題」

變成：

> 「我會做這類題。」

---

## 8. 題型辨識速查表

| 題目訊號 | 優先想到 |
|---|---|
| Duplicate | HashSet |
| Frequency | HashMap |
| Two Sum | HashMap |
| Pair + Sorted | Two Pointers |
| Palindrome | Two Pointers |
| Substring | Sliding Window |
| Subarray | Sliding Window / Prefix Sum |
| Longest Substring | Sliding Window |
| Matching | Stack |
| Next Greater | Monotonic Stack |
| Sorted + Search | Binary Search |
| Top K | Heap |
| Kth Largest | Heap |
| Binary Tree | DFS / BFS |
| Level Order | BFS |
| Island | DFS / BFS |
| Connected | DFS / BFS |
| Shortest Path（無權） | BFS |
| All combinations | Backtracking |
| All permutations | Backtracking |
| All subsets | Backtracking |
| Maximum / Minimum + repeated states | DP |
| Interval | Sort + Iterate |
| Dependency | Graph / Topological Sort |

---

## 9. HackerRank 前 3 天的策略

## 不再大量學新題

改成：

```text
題目
 ↓
5 分鐘判斷 Pattern
 ↓
20～30 分鐘 Coding
 ↓
測試 Edge Cases
 ↓
檢查 Time Complexity
```

### 常見 Edge Cases

```text
空陣列
只有一個元素
全部相同
沒有答案
答案在第一個 / 最後一個
負數
0
重複元素
極大數值
```

---

## 10. 考試前應該達成的能力

不是：

> 「我刷了幾題？」

而是：

### S Tier

看到題目可以在 **3～5 分鐘內判斷主要 Pattern**。

### Template

以下可以不看資料自己寫：

```text
HashMap
HashSet
Two Pointers
Sliding Window
Stack
Binary Search
DFS
BFS
Heap
Backtracking
```

### Easy

大部分可以在：

> **5～15 分鐘完成**

### 常見 Medium

目標：

> **15～30 分鐘能寫出主要解法**

### 完全不會的題目

能夠快速判斷：

> 「這題我目前不熟，先跳過。」

---

## 11. 最重要的準備原則

兩週內不要把目標設定成：

> ❌ 刷完 NeetCode 150

而是：

> ✅ 熟悉 10～15 個高頻 Pattern

並建立：

```text
題目
  ↓
關鍵字
  ↓
Pattern
  ↓
資料結構
  ↓
C++ Template
  ↓
修改 Template
  ↓
AC
```

這才是目前從「看到題目沒想法」提升到「能在 HackerRank 限時完成題目」最有效的訓練路線。

---

## 最終優先順序

```text
S Tier
│
├─ 1. HashMap / HashSet
├─ 2. Two Pointers
├─ 3. Sliding Window
├─ 4. Stack
├─ 5. Binary Search
├─ 6. Tree DFS / BFS
├─ 7. Graph DFS / BFS
└─ 8. Heap / Priority Queue
        ↓
A Tier
│
├─ 9. Linked List
├─ 10. Prefix Sum
├─ 11. Sorting / Intervals
├─ 12. Backtracking
├─ 13. Basic DP
└─ 14. Topological Sort
        ↓
B Tier
│
├─ Trie
├─ Union Find
├─ Bit Manipulation
├─ Advanced DP
├─ Advanced Graph
└─ Segment Tree / Fenwick Tree
```

**兩週有限時間的核心原則：S Tier > A Tier > B Tier。**

如果某一個 S Tier Pattern 還無法做到「看題目知道方向 + 不看答案寫出基本 Template」，不要急著往下一個 Tier 前進。

## 套用模板前先確認

本頁的 `...`、`condition` 與未定義變數是思路骨架，需依題目補齊；完整範例請閱讀對應模板。Grid DFS 需判斷是否可走；BFS 在入列時標記 visited。包含負數的 sum equals K 優先考慮 Prefix Sum + HashMap，不能直接套 Sliding Window。

最終 Tier 順序決定投入比重，14 天表決定每日安排；Day 6 的 Linked List 仍屬 A Tier。這是備考練習安排，不代表官方考題頻率。
