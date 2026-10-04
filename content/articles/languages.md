## 三語言常用操作

以下是操作片段，不是完整入口程式；Java 放在方法內，C++ 的 include 放在檔案頂端。這裡用於讀懂寫法，不執行使用者程式。

## 1. 陣列與索引

三者都以 0 起算。Python list、Java ArrayList、C++ vector 可增長；Java int[] 固定長度。下例以可增長容器建立 [4,7]，讀取首項。

```python
a = [4]
a.append(7)
first = a[0]
```

```java
java.util.List<Integer> a = new java.util.ArrayList<>();
a.add(4);
a.add(7);
int first = a.get(0);
```

```cpp
#include <vector>
std::vector<int> a{4};
a.push_back(7);
int first = a[0];
```

## 2. 字串與拼接

Python str 與 Java String 不可變；C++ string 可變。下例建立 ab。索引單位不同：Python 以 code point，Java char 以 UTF-16 code unit，C++ string 以位元組；此處僅比較 ASCII。

```python
s = ''.join(['a', 'b'])
first = s[0]
```

```java
String s = new StringBuilder().append('a').append('b').toString();
char first = s.charAt(0);
```

```cpp
#include <string>
std::string s = "a";
s += 'b';
char first = s[0];
```

## 3. hash map 與頻率

預設值的寫法不同。C++ map[key] 會插入缺少的鍵；若只是查詢，應用 find。三段都讓 A 的次數增加一。

```python
counts = {}
counts['A'] = counts.get('A', 0) + 1
```

```java
java.util.Map<Character, Integer> counts = new java.util.HashMap<>();
counts.put('A', counts.getOrDefault('A', 0) + 1);
```

```cpp
#include <unordered_map>
std::unordered_map<char, int> counts;
++counts['A'];
```

## 4. 集合與存在性

Set 只記存在性，不保存次數；重複加入同一值仍只保留一份。雜湊容器的 O(1) 是平均假設。

```python
seen = set()
seen.add(7)
exists = 7 in seen
```

```java
java.util.Set<Integer> seen = new java.util.HashSet<>();
seen.add(7);
boolean exists = seen.contains(7);
```

```cpp
#include <unordered_set>
std::unordered_set<int> seen;
seen.insert(7);
bool exists = seen.count(7) != 0;
```

## 5. stack：後進先出

Java 使用 ArrayDeque；C++ top 與 pop 分開，pop 不回傳元素。取出前需確認非空。三段都取出最後加入的 7。

```python
stack = []
stack.append(7)
value = stack.pop()
```

```java
java.util.ArrayDeque<Integer> stack = new java.util.ArrayDeque<>();
stack.push(7);
int value = stack.pop();
```

```cpp
#include <stack>
std::stack<int> stack;
stack.push(7);
int value = stack.top();
stack.pop();
```

## 6. queue：先進先出

Python 用 deque.popleft，避免 list.pop(0) 的位移；Java 明確指定 addLast/removeFirst，C++ 用 queue。

```python
from collections import deque
queue = deque([4, 7])
value = queue.popleft()
```

```java
java.util.ArrayDeque<Integer> queue = new java.util.ArrayDeque<>();
queue.addLast(4);
queue.addLast(7);
int value = queue.removeFirst();
```

```cpp
#include <queue>
std::queue<int> queue;
queue.push(4);
queue.push(7);
int value = queue.front();
queue.pop();
```

## 7. priority queue：最小堆

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

## 8. 排序與是否修改輸入

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

## 9. HashSet：新增、刪除、清空

Sliding Window、去重與 visited 常用。Python discard 刪除不存在的值不報錯；remove 會報錯。Java remove 回傳是否刪除，C++ erase 回傳刪除數量。

```python
seen = {2, 7}
seen.add(9)
seen.discard(7)
seen.discard(99)
exists = 2 in seen
size = len(seen)
seen.clear()
empty = not seen
```

```java
java.util.Set<Integer> seen = new java.util.HashSet<>(java.util.Arrays.asList(2, 7));
seen.add(9);
boolean removed = seen.remove(7);
boolean missing = seen.remove(99);
boolean exists = seen.contains(2);
int size = seen.size();
seen.clear();
boolean empty = seen.isEmpty();
```

```cpp
#include <unordered_set>
std::unordered_set<int> seen{2, 7};
bool inserted = seen.insert(9).second;
std::size_t removed = seen.erase(7);
std::size_t missing = seen.erase(99);
bool exists = seen.count(2) != 0;
std::size_t size = seen.size();
seen.clear();
bool empty = seen.empty();
```

## 10. HashMap：查詢、更新、刪除

Two Sum、頻率視窗常用。只查詢時不新增 key；次數歸零後可刪除，讓容器大小代表有效種類數。下例查缺少的 key 回傳 0，將 2 的次數減成 0 後移除。

```python
counts = {2: 1, 7: 3}
value = counts.get(99, 0)
exists = 2 in counts
counts[2] -= 1
if counts[2] == 0:
    del counts[2]
counts.pop(99, None)
size = len(counts)
```

```java
java.util.Map<Integer, Integer> counts = new java.util.HashMap<>();
counts.put(2, 1);
counts.put(7, 3);
int value = counts.getOrDefault(99, 0);
boolean exists = counts.containsKey(2);
counts.put(2, counts.get(2) - 1);
if (counts.get(2) == 0) counts.remove(2);
counts.remove(99);
int size = counts.size();
```

```cpp
#include <unordered_map>
std::unordered_map<int, int> counts{{2, 1}, {7, 3}};
auto it = counts.find(99);
int value = it == counts.end() ? 0 : it->second;
bool exists = counts.count(2) != 0;
if (--counts[2] == 0) counts.erase(2);
counts.erase(99);
std::size_t size = counts.size();
```

## 11. HashMap：走訪 key 與 value

Group Anagrams、Top K Frequent 常用。雜湊容器走訪順序不保證排序；下例累加所有頻率為 4。走訪時不要直接改變容器結構；需要刪除時使用對應的 iterator 或先記錄待刪除項。

```python
counts = {2: 1, 7: 3}
total = 0
for key, frequency in counts.items():
    total += frequency
```

```java
java.util.Map<Integer, Integer> counts = new java.util.HashMap<>();
counts.put(2, 1);
counts.put(7, 3);
int total = 0;
for (java.util.Map.Entry<Integer, Integer> entry : counts.entrySet()) {
    int key = entry.getKey();
    int frequency = entry.getValue();
    total += frequency;
}
```

```cpp
#include <unordered_map>
std::unordered_map<int, int> counts{{2, 1}, {7, 3}};
int total = 0;
for (const auto& [key, frequency] : counts) {
    total += frequency;
}
```

## 12. 動態陣列：尾端操作、刪除與複製

Backtracking 用尾端新增／刪除；刪除中間元素通常需 O(n) 位移。Java remove(1) 是刪索引，remove(Integer.valueOf(1)) 才是刪值。三者的複製都是淺複製；巢狀可變元素仍需另外複製。

```python
path = [1, 2, 3]
last = path[-1]
path.pop()
del path[0]
copy = path.copy()
path.append(9)
size = len(path)
```

```java
java.util.List<Integer> path = new java.util.ArrayList<>(java.util.Arrays.asList(1, 2, 3));
int last = path.get(path.size() - 1);
path.remove(path.size() - 1);
path.remove(0);
java.util.List<Integer> copy = new java.util.ArrayList<>(path);
path.add(9);
int size = path.size();
```

```cpp
#include <vector>
std::vector<int> path{1, 2, 3};
int last = path.back();
path.pop_back();
path.erase(path.begin());
std::vector<int> copy = path;
path.push_back(9);
std::size_t size = path.size();
```

## 13. Deque：兩端新增、讀取、刪除

BFS、單調佇列常用；兩端操作通常 O(1)。讀取或刪除前先確認非空。下例從 [2,7] 變成 [1,2,7,9]，讀取後移除兩端。

```python
from collections import deque
dq = deque([2, 7])
dq.appendleft(1)
dq.append(9)
if dq:
    front = dq[0]
    back = dq[-1]
    dq.popleft()
    dq.pop()
size = len(dq)
```

```java
java.util.Deque<Integer> dq = new java.util.ArrayDeque<>(java.util.Arrays.asList(2, 7));
dq.addFirst(1);
dq.addLast(9);
int front = 0, back = 0;
if (!dq.isEmpty()) {
    front = dq.peekFirst();
    back = dq.peekLast();
    dq.removeFirst();
    dq.removeLast();
}
int size = dq.size();
```

```cpp
#include <deque>
std::deque<int> dq{2, 7};
dq.push_front(1);
dq.push_back(9);
int front = 0, back = 0;
if (!dq.empty()) {
    front = dq.front();
    back = dq.back();
    dq.pop_front();
    dq.pop_back();
}
std::size_t size = dq.size();
```

## 14. Heap：最大堆與查看堆頂

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

## 15. 排序：自訂比較器與二維資料

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

## 16. 二分邊界：第一個 ≥ 與第一個 >

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

## 17. 字串：擷取、搜尋、反轉與數值轉換

以下限 ASCII。Python／Java 擷取使用 [start,end)，C++ substr 第二參數是長度。搜尋失敗：Python／Java 為 −1，C++ 為 string::npos。數值轉換可能失敗或超出範圍；擷取與反轉通常需 O(k) 工作。

```python
text = "abcd"
part = text[1:3]
position = text.find("bc")
missing = text.find("z") == -1
reversed_text = text[::-1]
number = int("123")
digits = str(123)
```

```java
String text = "abcd";
String part = text.substring(1, 3);
int position = text.indexOf("bc");
boolean missing = text.indexOf("z") == -1;
String reversedText = new StringBuilder(text).reverse().toString();
int number = Integer.parseInt("123");
String digits = String.valueOf(123);
```

```cpp
#include <string>
#include <algorithm>
std::string text = "abcd";
std::string part = text.substr(1, 2);
std::size_t position = text.find("bc");
bool missing = text.find("z") == std::string::npos;
std::string reversedText = text;
std::reverse(reversedText.begin(), reversedText.end());
int number = std::stoi("123");
std::string digits = std::to_string(123);
```

## 18. 二維陣列與 Graph 鄰接表初始化

Grid visited、2D DP、Graph 常用。Python 必須逐列建立，不能用 [[False] * cols] * rows，否則各列共用同一份 list。Java int[][]／boolean[][] 自動為 0／false；C++ 明確填入初值。

```python
rows, cols, n = 2, 3, 3
visited = [[False] * cols for _ in range(rows)]
visited[0][0] = True
graph = [[] for _ in range(n)]
graph[0].append(1)
```

```java
int rows = 2, cols = 3, n = 3;
boolean[][] visited = new boolean[rows][cols];
visited[0][0] = true;
java.util.List<java.util.List<Integer>> graph = new java.util.ArrayList<>();
for (int i = 0; i < n; i++) graph.add(new java.util.ArrayList<>());
graph.get(0).add(1);
```

```cpp
#include <vector>
int rows = 2, cols = 3, n = 3;
std::vector<std::vector<bool>> visited(rows, std::vector<bool>(cols, false));
visited[0][0] = true;
std::vector<std::vector<int>> graph(n);
graph[0].push_back(1);
```

## 19. Heap：複合資料與排序方向

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

## 20. 排序容器：有序 Set／Map 與下界

需要持續維持有序值時，Java TreeSet／TreeMap 與 C++ set／map 的查找、插入、刪除通常 O(log n)。Python 標準庫沒有等價的平衡樹 set；下例用排序 list + bisect 模擬，有序插入／刪除會因位移花 O(n)。查不到下界時分別為 None、null 或 end()。

```python
from bisect import bisect_left, insort
values = [2, 7]
insort(values, 4)
position = bisect_left(values, 3)
ceiling = values[position] if position < len(values) else None
position = bisect_left(values, 4)
if position < len(values) and values[position] == 4:
    values.pop(position)
```

```java
java.util.NavigableSet<Integer> values = new java.util.TreeSet<>(java.util.Arrays.asList(2, 7));
values.add(4);
Integer ceiling = values.ceiling(3);
values.remove(4);
```

```cpp
#include <set>
std::set<int> values{2, 7};
values.insert(4);
auto it = values.lower_bound(3);
bool found = it != values.end();
int ceiling = found ? *it : 0;
values.erase(4);
```

## 參考與下一步

操作語意可查 [Python 資料結構文件](https://docs.python.org/3/tutorial/datastructures.html) 與 [Java PriorityQueue 文件](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/PriorityQueue.html)。實際解題時另檢查整數範圍、字元集與複製成本。

前往[模式模板庫](/templates)比較完整函式，或閱讀 [時間複雜度](/big-o)練習成本推導。
