## 定義

先進先出（FIFO）：從尾端加入、從頭端取出。Deque 允許兩端操作，可實作 queue 或 stack。

## 圖解

![Queue 的結構示意：out <- A、B、C、D <- in](/diagrams/queue.svg)

先加入 A、B、C，出隊順序為 A、B、C。若處理 A 時新增 D，它排在目前等待中的 B、C 後面。

## 複雜度

| 操作 | 成本 | 前提與說明 |
|---|---|---|
| 入隊／出隊 | O(1) 或攤銷 O(1) | 使用環狀緩衝、串列或 deque |
| 查看隊首 | O(1) | 需處理空 queue |
| 儲存 n 項 | O(n) | BFS 最寬一層可能線性 |

## 適用情境

BFS 逐層展開、先到先服務的工作排程。找最少邊數時，先加入的近節點應先被處理。

## 常見誤區

Python list.pop(0) 需要位移，反覆出隊可能退化成 O(n²)，應使用 deque.popleft。BFS 於入隊時標記 visited，避免重複入隊。

## 自我檢查與下一步

試著用自己的話回答：「這個結構保證哪些操作便宜？我是否把搜尋位置、複製或擴容的成本漏算了？」

前往[相關教材](/templates/bfs-dfs)，或回到[資料結構索引](/data-structures)。

## 三語言常用操作

### queue：先進先出

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

### Deque：兩端新增、讀取、刪除

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
