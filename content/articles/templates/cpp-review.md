## C++ 高頻模板複習

配合[14 天刷題順序](/practice-order)，先不看答案寫出模板，再修改成題目需要的狀態。以下使用 C++17，陣列索引用 `int`，累加值用 `long long`。各段函式獨立使用，放在題目要求的 `Solution` 類別內即可；鏈結串列使用平台提供的 `ListNode`。

```cpp
#include <bits/stdc++.h>
using namespace std;
```

## 1. HashMap / HashSet：存在、次數、位置

Two Sum 先查補數再存目前位置，避免重複使用同一元素。平均時間 O(n)，空間 O(n)；雜湊碰撞嚴重時時間可能退化。

```cpp
vector<int> twoSum(const vector<int>& nums, int target) {
    unordered_map<long long, int> seen;
    for (int i = 0; i < static_cast<int>(nums.size()); ++i) {
        long long need = static_cast<long long>(target) - nums[i];
        auto it = seen.find(need);
        if (it != seen.end()) return {it->second, i};
        seen[nums[i]] = i;
    }
    return {};
}

bool containsDuplicate(const vector<int>& nums) {
    unordered_set<int> seen;
    for (int x : nums) {
        if (!seen.insert(x).second) return true;
    }
    return false;
}
```

頻率用 `unordered_map<int, int> freq;` 與 `++freq[x];`；只查是否存在時用 `find` 或 `count`，避免 `operator[]` 意外新增 key。延伸閱讀：[HashMap / Set](/data-structures/hashmap-set)。

## 2. Stack / Monotonic Stack：下一個更大值

Daily Temperatures 存尚未找到較暖天氣的索引，保持溫度單調不遞增。相同溫度不彈出。每個索引最多進出一次，時間 O(n)，空間 O(n)。呼叫 `top()` 或 `pop()` 前必須確認非空。

```cpp
vector<int> dailyTemperatures(const vector<int>& temperatures) {
    vector<int> answer(temperatures.size(), 0);
    stack<int> pending;
    for (int i = 0; i < static_cast<int>(temperatures.size()); ++i) {
        while (!pending.empty() && temperatures[i] > temperatures[pending.top()]) {
            int previous = pending.top();
            pending.pop();
            answer[previous] = i - previous;
        }
        pending.push(i);
    }
    return answer;
}
```

一般括號配對改存開括號；RPN 改存運算值，彈出時先取右運算元再取左運算元。延伸閱讀：[Stack](/data-structures/stack)。

## 3. Linked List：反轉鏈結

先保留下一個節點，再改 `next`。時間 O(n)，額外空間 O(1)，會修改原鏈結；空串列回傳 `nullptr`。

```cpp
ListNode* reverseList(ListNode* head) {
    ListNode* previous = nullptr;
    ListNode* current = head;
    while (current != nullptr) {
        ListNode* next = current->next;
        current->next = previous;
        previous = current;
        current = next;
    }
    return previous;
}
```

Cycle 使用快慢指標；刪除倒數第 N 個節點常用 dummy node 與固定距離雙指標。延伸閱讀：[Linked List](/data-structures/linked-list)、[雙指標](/templates/two-pointers)。

## 4. Prefix Sum + HashMap：Subarray Sum Equals K

目前 prefix 為 sum，查先前有幾個 prefix 等於 sum − k。初始化 `frequency[0] = 1`，先查再新增，避免把空區間算入。可處理負數與 0；平均時間 O(n)，空間 O(n)。一般 Range Sum 用長度 n + 1 的 prefix，區間 [l, r) 為 prefix[r] − prefix[l]。

```cpp
long long subarraySum(const vector<int>& nums, long long k) {
    unordered_map<long long, long long> frequency;
    frequency[0] = 1;
    long long sum = 0, answer = 0;
    for (int x : nums) {
        sum += x;
        auto it = frequency.find(sum - k);
        if (it != frequency.end()) answer += it->second;
        ++frequency[sum];
    }
    return answer;
}
```

Product of Array Except Self 使用前綴與後綴乘積，不是累加和；要另外注意 0 與乘積溢位。

## 5. Sorting / Intervals：先排序再合併

假設每個區間有兩個端點且 start ≤ end。以下把端點相接也視為可合併；若題意使用半開區間，需重新判斷邊界。時間 O(n log n)，結果空間 O(n)，傳值保留原輸入。

```cpp
vector<vector<int>> mergeIntervals(vector<vector<int>> intervals) {
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> result;
    for (const auto& interval : intervals) {
        if (result.empty() || interval[0] > result.back()[1]) {
            result.push_back(interval);
        } else {
            result.back()[1] = max(result.back()[1], interval[1]);
        }
    }
    return result;
}
```

Non-overlapping Intervals 的貪心通常依結束時間排序，不能直接照抄合併模板。

## 6. Heap：保留最大的 K 個元素

Kth Largest 用容量 k 的 min heap，堆頂就是目前第 k 大。以下假設 1 ≤ k ≤ nums.size()。時間 O(n log(k + 1))，空間 O(k)。

```cpp
int findKthLargest(const vector<int>& nums, int k) {
    if (k < 1 || k > static_cast<int>(nums.size())) {
        throw invalid_argument("k out of range");
    }
    priority_queue<int, vector<int>, greater<int>> heap;
    for (int x : nums) {
        heap.push(x);
        if (static_cast<int>(heap.size()) > k) heap.pop();
    }
    return heap.top();
}
```

Max heap 使用 `priority_queue<int>`。Top K Frequent 先計數，再按頻率放進 heap；K Closest 比較平方距離，計算前轉 `long long`。延伸閱讀：[Heap](/data-structures/heap)。

## 7. Topological Sort：依賴、先修課程

Kahn BFS 使用入度，將入度 0 的節點入列。邊 from → to 代表必須先完成 from；Course Schedule 的 [course, prerequisite] 要轉成 prerequisite → course。若取出的節點不足 n，代表有環。時間與空間 O(V + E)。

```cpp
bool canFinish(int n, const vector<pair<int, int>>& edges) {
    vector<vector<int>> graph(n);
    vector<int> indegree(n, 0);
    for (auto [from, to] : edges) {
        graph[from].push_back(to);
        ++indegree[to];
    }
    queue<int> ready;
    for (int i = 0; i < n; ++i) {
        if (indegree[i] == 0) ready.push(i);
    }
    int completed = 0;
    while (!ready.empty()) {
        int node = ready.front();
        ready.pop();
        ++completed;
        for (int next : graph[node]) {
            if (--indegree[next] == 0) ready.push(next);
        }
    }
    return completed == n;
}
```

假設 n ≥ 0 且所有節點編號在 [0, n)。普通 visited 無法單獨判斷有向環。延伸閱讀：[Graph](/data-structures/graph)。

## 已有模式模板

| 當日主題 | 教材 | 複習重點 |
|---|---|---|
| Day 2 | [Two Pointers](/templates/two-pointers) | 指標移動條件、去重 |
| Day 3 | [Sliding Window](/templates/sliding-window) | 加入、縮窗、更新答案的時機 |
| Day 5 | [Binary Search](/templates/binary-search) | 區間定義與單調判斷 |
| Day 7 / 9 | [DFS / BFS](/templates/bfs-dfs) | 空 root、visited、入列時標記 |
| Day 10 | [Backtracking](/templates/backtracking) | choose → recurse → undo |
| Day 12 | [DP](/templates/dp) | 狀態、轉移、初始值與遍歷順序 |

Tree BFS 先檢查 root 是否為空，每層開始時保存 queue 大小；Grid BFS 在入列時標記 visited，並檢查邊界和障礙。DFS 很深時改用顯式 stack，避免遞迴堆疊耗盡。
