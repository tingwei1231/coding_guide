## 通用語法與跨結構操作

資料結構的操作放在對應章節，這裡保留排序、二分邊界等跨結構語法。

| 資料結構 | 三語言操作 |
|---|---|
| [Array](/data-structures/array) | 索引、新增、刪除、複製 |
| [String](/data-structures/string) | 拼接、擷取、搜尋、反轉、數值轉換 |
| [HashMap / Set](/data-structures/hashmap-set) | 頻率、新增、刪除、查找、走訪、有序容器 |
| [Stack](/data-structures/stack) | 入堆、出堆、讀取堆頂 |
| [Queue / Deque](/data-structures/queue) | 入列、出列、兩端操作 |
| [Heap](/data-structures/heap) | 最小／最大堆、複合資料比較器 |
| [Graph](/data-structures/graph) | 鄰接表與二維 visited 初始化 |

## 1. 排序與是否修改輸入

下例都將可變序列原地排序為 [2,7]。Python sorted(a) 則回傳新列表；Java Arrays.sort 適用陣列；C++ sort 使用半開迭代器區間。不要在需要保留原始位置的容器題先排序。

```python
a = [7, 2]
a.sort()
```

```java
int[] a = {7, 2};
java.util.Arrays.sort(a);
```

```cpp
#include <vector>
#include <algorithm>
std::vector<int> a{7, 2};
std::sort(a.begin(), a.end());
```

## 2. 排序：自訂比較器與二維資料

Intervals、K Closest 常用。下例按第一欄升序，相同時第二欄降序。比較器須嚴格排序：相等不能回傳「排在前面」；Java 用 Integer.compare，避免相減溢位。

```python
items = [[2, 1], [1, 2], [1, 4]]
items.sort(key=lambda item: (item[0], -item[1]))
```

```java
int[][] items = {{2, 1}, {1, 2}, {1, 4}};
java.util.Arrays.sort(items, (a, b) -> {
    int first = Integer.compare(a[0], b[0]);
    return first != 0 ? first : Integer.compare(b[1], a[1]);
});
```

```cpp
#include <vector>
#include <algorithm>
std::vector<std::vector<int>> items{{2, 1}, {1, 2}, {1, 4}};
std::sort(items.begin(), items.end(), [](const auto& a, const auto& b) {
    if (a[0] != b[0]) return a[0] < b[0];
    return a[1] > b[1];
});
```

## 3. 二分邊界：第一個 ≥ 與第一個 >

適用已升序的陣列。lower bound 是第一個 ≥ target；upper bound 是第一個 > target；相減為出現次數。找不到時回傳 n，不能直接當索引讀取。Java Arrays.binarySearch 不保證回傳重複值的第一個位置，因此此處手寫邊界。

```python
from bisect import bisect_left, bisect_right
nums = [1, 2, 2, 4]
left = bisect_left(nums, 2)
right = bisect_right(nums, 2)
count = right - left
```

```java
int[] nums = {1, 2, 2, 4};
int target = 2;
int lo = 0, hi = nums.length;
while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    if (nums[mid] >= target) hi = mid;
    else lo = mid + 1;
}
int left = lo;
lo = 0;
hi = nums.length;
while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    if (nums[mid] > target) hi = mid;
    else lo = mid + 1;
}
int right = lo;
int count = right - left;
```

```cpp
#include <vector>
#include <algorithm>
std::vector<int> nums{1, 2, 2, 4};
int left = static_cast<int>(std::lower_bound(nums.begin(), nums.end(), 2) - nums.begin());
int right = static_cast<int>(std::upper_bound(nums.begin(), nums.end(), 2) - nums.begin());
int count = right - left;
```

## 參考與下一步

依操作主體閱讀上方資料結構章節；前往[模式模板](/templates)查看完整演算法，或閱讀[時間複雜度](/big-o)。
