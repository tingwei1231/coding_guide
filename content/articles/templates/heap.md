以下每組獨立使用，預設 C++，可切換 Python、Java。C++ 使用 `#include <bits/stdc++.h>`、`using namespace std;`；Java 使用 `import java.util.*;`。ListNode、TreeNode 由平台提供。

## Heap：保留最大的 K 個元素

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
