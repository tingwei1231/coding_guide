以下每組獨立使用，預設 C++，可切換 Python、Java。C++ 使用 `#include <bits/stdc++.h>`、`using namespace std;`；Java 使用 `import java.util.*;`。ListNode、TreeNode 由平台提供。

## Sorting / Intervals：先排序再合併

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
