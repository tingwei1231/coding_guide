依 [Pattern 總覽](/templates/pattern-notes)，先區分樹的子問題與圖的重訪控制。

- Tree DFS：先定義回傳給 parent 的資訊，再合併左右子樹；空節點回傳 base case。
- Tree BFS：空 root 先返回，每層固定 level_size，避免新增 child 混入本層。
- Graph DFS：進入後先標記 visited，再展開鄰居。
- Graph BFS：入列時就標記 visited，queue 依距離擴張，適用無權圖最少邊數。
- Grid DFS：先檢查邊界、是否可走與 visited，再標記並走四方向。

以下鄰接表模板只走訪起點可達範圍，不會自動處理其他連通分量。樹與 Flood Fill 模板見本頁，BST 見 [BST 模板](/templates/bst)，Kahn 見[拓撲排序模板](/templates/topological-sort)。深圖可能超出遞迴堆疊，需改用顯式 stack。

以下每組獨立使用，預設 C++，可切換 Python、Java。C++ 使用 `#include <bits/stdc++.h>`、`using namespace std;`；Java 使用 `import java.util.*;`。ListNode、TreeNode 由平台提供。

## Tree DFS：由子樹回傳資訊

先定義 DFS 回傳值。本例回傳子樹高度：空節點為 0，當前為 1 + max(left, right)。時間 O(n)，遞迴空間 O(h)，深樹需考慮顯式 stack。最大路徑和等題目需區分「回傳給 parent 的單側資訊」與「更新全域答案的雙側資訊」。

```python
def maxDepth(node):
    if node is None:
        return 0
    left = maxDepth(node.left)
    right = maxDepth(node.right)
    return 1 + max(left, right)
```

```java
class Solution {
    public int maxDepth(TreeNode node) {
        if (node == null) return 0;
        int left = maxDepth(node.left);
        int right = maxDepth(node.right);
        return 1 + Math.max(left, right);
    }
}
```

```cpp
int maxDepth(TreeNode* node) {
    if (node == nullptr) return 0;
    int left = maxDepth(node->left);
    int right = maxDepth(node->right);
    return 1 + max(left, right);
}
```

## Tree BFS：逐層處理

每層開始固定 queue.size()，避免新增的 child 混入本層。先處理空 root；時間 O(n)，空間 O(w)，w 是最大層寬。

```python
from collections import deque

def levelOrder(root):
    if root is None:
        return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left is not None:
                queue.append(node.left)
            if node.right is not None:
                queue.append(node.right)
        result.append(level)
    return result
```

```java
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        Queue<TreeNode> queue = new ArrayDeque<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                level.add(node.val);
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            result.add(level);
        }
        return result;
    }
}
```

```cpp
vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> result;
    if (root == nullptr) return result;
    queue<TreeNode*> pending;
    pending.push(root);
    while (!pending.empty()) {
        int levelSize = static_cast<int>(pending.size());
        vector<int> level;
        for (int i = 0; i < levelSize; i++) {
            TreeNode* node = pending.front();
            pending.pop();
            level.push_back(node->val);
            if (node->left != nullptr) pending.push(node->left);
            if (node->right != nullptr) pending.push(node->right);
        }
        result.push_back(level);
    }
    return result;
}
```

## Grid DFS / Flood Fill：格子就是圖

四方向代表邊；先檢查邊界與格子是否可走，再標記，最後探索鄰居。本例只處理矩形整數 grid，把連通的原色改成新色；若顏色相同直接返回，避免重訪。時間與最壞遞迴空間 O(rows × cols)。

```python
def floodFill(grid, sr, sc, color):
    if not grid or not grid[0] or not (0 <= sr < len(grid) and 0 <= sc < len(grid[0])):
        return grid
    old = grid[sr][sc]
    if old == color:
        return grid
    def dfs(r, c):
        if not (0 <= r < len(grid) and 0 <= c < len(grid[0])):
            return
        if grid[r][c] != old:
            return
        grid[r][c] = color
        for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
            dfs(r + dr, c + dc)
    dfs(sr, sc)
    return grid
```

```java
class Solution {
    private void dfs(int[][] grid, int r, int c, int old, int color) {
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length) return;
        if (grid[r][c] != old) return;
        grid[r][c] = color;
        int[][] directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        for (int[] d : directions) dfs(grid, r + d[0], c + d[1], old, color);
    }
    public int[][] floodFill(int[][] grid, int sr, int sc, int color) {
        if (grid.length == 0 || grid[0].length == 0 ||
            sr < 0 || sr >= grid.length || sc < 0 || sc >= grid[0].length) return grid;
        int old = grid[sr][sc];
        if (old != color) dfs(grid, sr, sc, old, color);
        return grid;
    }
}
```

```cpp
vector<vector<int>> floodFill(vector<vector<int>>& grid, int sr, int sc, int color) {
    if (grid.empty() || grid[0].empty() ||
        sr < 0 || sr >= static_cast<int>(grid.size()) ||
        sc < 0 || sc >= static_cast<int>(grid[0].size())) return grid;
    int old = grid[sr][sc];
    if (old == color) return grid;
    const int directions[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
    function<void(int, int)> dfs = [&](int r, int c) {
        if (r < 0 || r >= static_cast<int>(grid.size()) ||
            c < 0 || c >= static_cast<int>(grid[0].size()) || grid[r][c] != old) return;
        grid[r][c] = color;
        for (const auto& d : directions) dfs(r + d[0], c + d[1]);
    };
    dfs(sr, sc);
    return grid;
}
```
