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

## 參考與下一步

操作語意可查 [Python 資料結構文件](https://docs.python.org/3/tutorial/datastructures.html) 與 [Java PriorityQueue 文件](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/PriorityQueue.html)。實際解題時另檢查整數範圍、字元集與複製成本。

前往[模式模板庫](/templates)比較完整函式，或閱讀 [時間複雜度](/big-o)練習成本推導。
