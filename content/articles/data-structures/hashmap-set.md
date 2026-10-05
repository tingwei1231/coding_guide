## 定義

hash map 把鍵映射到桶，再處理碰撞。Map 儲存鍵值關聯，Set 只記錄存在性；鍵必須遵守相等與雜湊一致的規則。

## 圖解

![HashMap / Set 的結構示意：key A、hash(A)、bucket、A -> 2](/diagrams/hashmap-set.svg)

走訪 [A,B,A]，頻率依序是 {A:1}、{A:1,B:1}、{A:2,B:1}。Map 的鍵沒有重複，重複資訊存在值中。

## 複雜度

| 操作 | 成本 | 前提與說明 |
|---|---|---|
| 查找／插入／刪除 | 平均 O(1)，一般最差 O(n) | 假設雜湊分布良好；字串鍵雜湊成本另計 |
| 走訪全部項目 | 至少 O(n) | 部分實作另受容量影響 |
| 儲存 n 個鍵 | O(n) | 桶、鍵與值的額外成本 |

## 適用情境

判斷是否出現過、計算頻率、將值映射到索引。不需要順序時，用 Set 表達單純存在性會比 Map 更直接。

## 常見誤區

平均 O(1) 不是任何輸入下都保證 O(1)。不要依賴未承諾的走訪順序；計數 AAB 時 Set 只知道 A 存在，無法表示需要兩個 A。

## 自我檢查與下一步

試著用自己的話回答：「這個結構保證哪些操作便宜？我是否把搜尋位置、複製或擴容的成本漏算了？」

前往[相關教材](/templates/sliding-window#variation-frequency-count)，或回到[資料結構索引](/data-structures)。

## 三語言常用操作

### hash map 與頻率

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

### 集合與存在性

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

### HashSet：新增、刪除、清空

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

### HashMap：查詢、更新、刪除

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

### HashMap：走訪 key 與 value

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

### 排序容器：有序 Set／Map 與下界

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
