## 高頻模板練習題

配合[14 天刷題順序](/practice-order)，先不看答案寫出模板，再修改成題目需要的狀態。以 C++17 模板為基準，提供 Python、Java 對照。C++ 函式放在平台要求的 `Solution` 類別內，Java 先匯入 `java.util.*`；鏈結串列使用平台提供的 `ListNode`。每組預設顯示 C++，可切換語言。

```python
from collections import deque
import heapq
```

```java
import java.util.*;
```

```cpp
#include <bits/stdc++.h>
using namespace std;
```

## 1. HashMap：存在、次數、位置

Two Sum 先查補數再存目前位置，避免重複使用同一元素；Contains Duplicate 也使用 HashMap 記錄已出現的值。C++ 的 `target - nums[i]` 須在 `int` 範圍內。平均時間 O(n)，空間 O(n)；雜湊碰撞嚴重時時間可能退化。

```python
def twoSum(nums, target):
    seen = {}
    for i in range(len(nums)):
        need = target - nums[i]
        if need in seen:
            return [seen[need], i]
        seen[nums[i]] = i
    return []

def containsDuplicate(nums):
    seen = {}
    for i in range(len(nums)):
        if nums[i] in seen:
            return True
        seen[nums[i]] = seen.get(nums[i], 0) + 1
    return False
```

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int need = target - nums[i];
            if (seen.containsKey(need)) {
                return new int[]{seen.get(need), i};
            }
            seen.put(nums[i], i);
        }
        return new int[0];
    }

    public boolean containsDuplicate(int[] nums) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            if (seen.containsKey(nums[i])) {
                return true;
            }
            seen.put(nums[i], seen.getOrDefault(nums[i], 0) + 1);
        }
        return false;
    }
}
```

```cpp
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); i++) {
        int need = target - nums[i];
        if (seen.count(need)) {
            return {seen[need], i};
        }
        seen[nums[i]] = i;
    }
    return {};
}

bool containsDuplicate(vector<int>& nums) {
    unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); i++) {
        if (seen.count(nums[i])) {
            return true;
        }
        seen[nums[i]]++;
    }
    return false;
}
```

頻率用 `unordered_map<int, int> freq;` 與 `++freq[x];`；只查是否存在時用 `find` 或 `count`，避免 `operator[]` 意外新增 key。延伸閱讀：[HashMap / Set](/data-structures/hashmap-set)。

## 2. Stack / Monotonic Stack：下一個更大值

Daily Temperatures 存尚未找到較暖天氣的索引，保持溫度單調不遞增。相同溫度不彈出。每個索引最多進出一次，時間 O(n)，空間 O(n)。呼叫 `top()` 或 `pop()` 前必須確認非空。

```python
def dailyTemperatures(temperatures):
    answer = [0] * len(temperatures)
    pending = []
    for i in range(len(temperatures)):
        while pending and temperatures[i] > temperatures[pending[-1]]:
            previous = pending.pop()
            answer[previous] = i - previous
        pending.append(i)
    return answer
```

```java
class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int[] answer = new int[temperatures.length];
        Deque<Integer> pending = new ArrayDeque<>();
        for (int i = 0; i < temperatures.length; i++) {
            while (!pending.isEmpty() && temperatures[i] > temperatures[pending.peek()]) {
                int previous = pending.pop();
                answer[previous] = i - previous;
            }
            pending.push(i);
        }
        return answer;
    }
}
```

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

```python
def reverseList(head):
    previous = None
    current = head
    while current is not None:
        next_node = current.next
        current.next = previous
        previous = current
        current = next_node
    return previous
```

```java
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode previous = null;
        ListNode current = head;
        while (current != null) {
            ListNode next = current.next;
            current.next = previous;
            previous = current;
            current = next;
        }
        return previous;
    }
}
```

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

```python
def subarraySum(nums, k):
    frequency = {0: 1}
    total = 0
    answer = 0
    for x in nums:
        total += x
        answer += frequency.get(total - k, 0)
        frequency[total] = frequency.get(total, 0) + 1
    return answer
```

```java
class Solution {
    public long subarraySum(int[] nums, long k) {
        Map<Long, Long> frequency = new HashMap<>();
        frequency.put(0L, 1L);
        long sum = 0, answer = 0;
        for (int x : nums) {
            sum += x;
            answer += frequency.getOrDefault(sum - k, 0L);
            frequency.put(sum, frequency.getOrDefault(sum, 0L) + 1);
        }
        return answer;
    }
}
```

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

```python
def mergeIntervals(intervals):
    intervals = sorted(intervals)
    result = []
    for interval in intervals:
        if not result or interval[0] > result[-1][1]:
            result.append(list(interval))
        else:
            result[-1][1] = max(result[-1][1], interval[1])
    return result
```

```java
class Solution {
    public int[][] mergeIntervals(int[][] intervals) {
        int[][] sorted = new int[intervals.length][];
        for (int i = 0; i < intervals.length; i++) {
            sorted[i] = intervals[i].clone();
        }
        Arrays.sort(sorted, (a, b) -> {
            int start = Integer.compare(a[0], b[0]);
            return start != 0 ? start : Integer.compare(a[1], b[1]);
        });
        List<int[]> result = new ArrayList<>();
        for (int[] interval : sorted) {
            if (result.isEmpty() || interval[0] > result.get(result.size() - 1)[1]) {
                result.add(interval);
            } else {
                int[] last = result.get(result.size() - 1);
                last[1] = Math.max(last[1], interval[1]);
            }
        }
        return result.toArray(new int[0][]);
    }
}
```

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

```python
import heapq

def findKthLargest(nums, k):
    if k < 1 or k > len(nums):
        raise ValueError("k out of range")
    heap = []
    for x in nums:
        heapq.heappush(heap, x)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]
```

```java
class Solution {
    public int findKthLargest(int[] nums, int k) {
        if (k < 1 || k > nums.length) {
            throw new IllegalArgumentException("k out of range");
        }
        PriorityQueue<Integer> heap = new PriorityQueue<>();
        for (int x : nums) {
            heap.offer(x);
            if (heap.size() > k) heap.poll();
        }
        return heap.peek();
    }
}
```

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

```python
from collections import deque

def canFinish(n, edges):
    graph = [[] for _ in range(n)]
    indegree = [0] * n
    for source, destination in edges:
        graph[source].append(destination)
        indegree[destination] += 1
    ready = deque(i for i in range(n) if indegree[i] == 0)
    completed = 0
    while ready:
        node = ready.popleft()
        completed += 1
        for next_node in graph[node]:
            indegree[next_node] -= 1
            if indegree[next_node] == 0:
                ready.append(next_node)
    return completed == n
```

```java
class Solution {
    public boolean canFinish(int n, int[][] edges) {
        List<List<Integer>> graph = new ArrayList<>();
        int[] indegree = new int[n];
        for (int i = 0; i < n; i++) graph.add(new ArrayList<>());
        for (int[] edge : edges) {
            int from = edge[0], to = edge[1];
            graph.get(from).add(to);
            indegree[to]++;
        }
        Queue<Integer> ready = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            if (indegree[i] == 0) ready.offer(i);
        }
        int completed = 0;
        while (!ready.isEmpty()) {
            int node = ready.poll();
            completed++;
            for (int next : graph.get(node)) {
                if (--indegree[next] == 0) ready.offer(next);
            }
        }
        return completed == n;
    }
}
```

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
