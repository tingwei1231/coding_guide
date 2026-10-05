以下每組獨立使用，預設 C++，可切換 Python、Java。C++ 使用 `#include <bits/stdc++.h>`、`using namespace std;`；Java 使用 `import java.util.*;`。ListNode、TreeNode 由平台提供。

## Topological Sort：依賴、先修課程

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
