## 定義

二元堆是完全二元樹，常以陣列存放。最小堆的父節點不大於子節點，但左右子樹及兄弟不保證排序。

## 圖解

![Heap 堆積 的結構示意：root 2、left 5、right 3](/diagrams/heap.svg)

最小堆 [2,5,3] 中，3 在 5 之後並不違規。插入 1 時先放尾端，成為 5 的左子節點，再與父節點交換直到恢復父節點不大於子節點的條件。

## 複雜度

| 操作 | 成本 | 前提與說明 |
|---|---|---|
| 查看最小／最大值 | O(1) | 由堆的方向決定 |
| 插入／移除根 | O(log n) | 沿樹高上浮／下沉 |
| 由 n 元素建堆 | O(n) | 自底向上 heapify |
| 查找任意值 | O(n) | 不能當作已排序陣列二分 |
| 儲存 | O(n) | 陣列保存完全二元樹 |

## 適用情境

反覆取極值、Top K、合併多個有序來源。若只需一次最大值，線性掃描通常更簡單。

## 常見誤區

Python heapq 與 Java PriorityQueue 預設最小堆；C++ priority_queue 預設最大堆。走訪底層陣列不會得到排序結果。

## 自我檢查與下一步

試著用自己的話回答：「這個結構保證哪些操作便宜？我是否把搜尋位置、複製或擴容的成本漏算了？」

前往[相關教材](/languages)，或回到[資料結構索引](/data-structures)。

## 三語言常用操作

### priority queue：最小堆

Python heapq 與 Java PriorityQueue 預設最小堆；C++ priority_queue 預設最大堆，要加 greater<int>。三段取出最小值 2，走訪容器不代表排序。

```python
import heapq
heap = [7, 2]
heapq.heapify(heap)
smallest = heapq.heappop(heap)
```

```java
java.util.PriorityQueue<Integer> heap = new java.util.PriorityQueue<>();
heap.add(7);
heap.add(2);
int smallest = heap.remove();
```

```cpp
#include <queue>
#include <vector>
#include <functional>
std::priority_queue<int, std::vector<int>, std::greater<int>> heap;
heap.push(7);
heap.push(2);
int smallest = heap.top();
heap.pop();
```

### Heap：最大堆與查看堆頂

Top K、雙 Heap 中位數常用。Python 用負值模擬最大堆；Java 用 reverseOrder；C++ 預設最大堆。查看堆頂不移除，新增／刪除堆頂 O(log n)。

```python
import heapq
heap = []
for x in [2, 7, 4]:
    heapq.heappush(heap, -x)
largest = -heap[0]
removed = -heapq.heappop(heap)
size = len(heap)
```

```java
java.util.PriorityQueue<Integer> heap = new java.util.PriorityQueue<>(java.util.Collections.reverseOrder());
for (int x : new int[]{2, 7, 4}) heap.offer(x);
int largest = heap.peek();
int removed = heap.poll();
int size = heap.size();
```

```cpp
#include <queue>
std::priority_queue<int> heap;
for (int x : {2, 7, 4}) heap.push(x);
int largest = heap.top();
int removed = heap.top();
heap.pop();
std::size_t size = heap.size();
```

### Heap：複合資料與排序方向

合併 K 個序列時可存 (value,index)，min heap 按 value 升序，同值按 index 升序。Python tuple 與 C++ pair 自帶字典序；Java int[] 須提供比較器。不要把不可比較的節點直接當成 Python 同值時的第二排序欄。

```python
import heapq
heap = []
heapq.heappush(heap, (7, 0))
heapq.heappush(heap, (2, 1))
heapq.heappush(heap, (2, 0))
value, index = heapq.heappop(heap)
```

```java
java.util.PriorityQueue<int[]> heap = new java.util.PriorityQueue<>((a, b) -> {
    int value = Integer.compare(a[0], b[0]);
    return value != 0 ? value : Integer.compare(a[1], b[1]);
});
heap.offer(new int[]{7, 0});
heap.offer(new int[]{2, 1});
heap.offer(new int[]{2, 0});
int[] entry = heap.poll();
int value = entry[0], index = entry[1];
```

```cpp
#include <queue>
#include <vector>
#include <utility>
#include <functional>
using Entry = std::pair<int, int>;
std::priority_queue<Entry, std::vector<Entry>, std::greater<Entry>> heap;
heap.push({7, 0});
heap.push({2, 1});
heap.push({2, 0});
auto [value, index] = heap.top();
heap.pop();
```
