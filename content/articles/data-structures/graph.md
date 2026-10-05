## 定義

圖由節點與邊組成，可有向或無向、帶權或無權，也可能不連通。鄰接表列出每個節點的鄰居，鄰接矩陣記錄任意兩點的邊。

## 圖解

![Graph 圖 的結構示意：A、B、C、D (isolated)](/diagrams/graph.svg)

A 連到 B、C，B 又連 C。若入隊前不檢查 visited，C 可能被兩個父節點重複加入。另一個孤立節點 D 不會自動被 A 的 BFS 訪問。

## 複雜度

| 操作 | 成本 | 前提與說明 |
|---|---|---|
| 鄰接表儲存 | O(V+E) | 無向邊常存兩次 |
| 鄰接矩陣儲存 | O(V²) | 適合密集圖或快速查邊 |
| 鄰接表 enumerate u 的鄰居 | O(deg(u)) | 和該點度數相關 |
| BFS／DFS 全圖 | O(V+E) | 每點與邊處理常數次 |
| 矩陣判斷一條邊 | O(1) | 以空間換時間 |

## 適用情境

朋友關係、先修依賴、道路、格子地圖。矩陣中的格子也可當節點，相鄰格子是隱含的邊。

## 常見誤區

從一個起點搜尋只看得到可達部分。含環時需 visited；無權 BFS 的最少邊數不等於一般帶權最短成本。先確認對角線是否算相鄰。

## 自我檢查與下一步

試著用自己的話回答：「這個結構保證哪些操作便宜？我是否把搜尋位置、複製或擴容的成本漏算了？」

前往[相關教材](/guided-learning/bfs-dfs)，或回到[資料結構索引](/data-structures)。

## 三語言常用操作

### 二維陣列與 Graph 鄰接表初始化

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
