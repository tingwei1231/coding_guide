代表題：LeetCode 200。以下聚焦思考步驟，題目全文與測資請前往外部平台。

## 1. 辨識：先確認資料與目標

把每個陸地格子當作節點，上下左右的相鄰陸地構成邊。題目要的是連通分量數，不是陸地格子數。先確認不計對角線，輸入是矩形且格子為字元 '0'/'1'。

## 2. 暴力解：建立可驗證的基準

一個可行但重複的基準：從每個陸地各自搜尋其整個連通區域，取得區域最小座標作代表，再將代表去重。若 N=R×C，最差對每格都走訪 N 格，時間 O(N²)、暫存 O(N)。它可計數，但反覆探索同一座島。

## 3. 關鍵觀察：為什麼能減少重複工作？

只對尚未訪問的陸地啟動 BFS。啟動一次就找到一座新島，隨後把整個連通區域標記，掃描再遇到同區域就跳過。例兩列 110 / 001，左上兩格是一島，右下格另一島，答案是 2；對角線不連通。

入隊時標記，避免多個鄰居把同一格重複放入。使用額外 seen 保留輸入，不把原圖直接改成水。DFS 也可以，但長蛇形島嶼的遞迴深度可能過大。

## 4. 虛擬碼與三語言參考實作

```text
建立全 false 的 seen，count=0
掃描每個格子：
  如果是未訪陸地：
    count++，標記並入隊
    當 queue 非空：
      取出一格
      將範圍內、未訪、為陸地的四鄰格標記後入隊
回傳 count
```

```python
from collections import deque
def num_islands(grid):
    if not grid or not grid[0]:
        return 0
    rows, cols = len(grid), len(grid[0])
    seen = [[False] * cols for _ in range(rows)]  # 不修改輸入
    islands = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] != '1' or seen[r][c]:
                continue
            islands += 1  # 尚未走訪的陸地代表新連通區域
            seen[r][c] = True
            queue = deque([(r, c)])
            while queue:
                x, y = queue.popleft()
                for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < rows and 0 <= ny < cols:
                        if grid[nx][ny] == '1' and not seen[nx][ny]:
                            seen[nx][ny] = True  # 入隊時標記
                            queue.append((nx, ny))
    return islands
```

```java
import java.util.ArrayDeque;
class Solution {
    public int numIslands(char[][] grid) {
        if (grid.length == 0 || grid[0].length == 0) return 0;
        int rows = grid.length, cols = grid[0].length, islands = 0;
        boolean[][] seen = new boolean[rows][cols];
        int[][] directions = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] != '1' || seen[r][c]) continue;
                islands++; // 新連通區域
                ArrayDeque<int[]> queue = new ArrayDeque<>();
                queue.addLast(new int[]{r,c});
                seen[r][c] = true;
                while (!queue.isEmpty()) {
                    int[] current = queue.removeFirst();
                    for (int[] d : directions) {
                        int x = current[0] + d[0], y = current[1] + d[1];
                        if (x >= 0 && x < rows && y >= 0 && y < cols && grid[x][y] == '1' && !seen[x][y]) {
                            seen[x][y] = true; // 入隊就標記
                            queue.addLast(new int[]{x,y});
                        }
                    }
                }
            }
        }
        return islands;
    }
}
```

```cpp
#include <vector>
#include <queue>
#include <utility>
int numIslands(const std::vector<std::vector<char>>& grid) {
    if (grid.empty() || grid[0].empty()) return 0;
    int rows = static_cast<int>(grid.size()), cols = static_cast<int>(grid[0].size());
    std::vector<std::vector<bool>> seen(rows, std::vector<bool>(cols, false));
    int directions[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
    int islands = 0;
    for (int r = 0; r < rows; ++r) {
        for (int c = 0; c < cols; ++c) {
            if (grid[r][c] != '1' || seen[r][c]) continue;
            ++islands;
            std::queue<std::pair<int,int>> queue;
            queue.push({r,c});
            seen[r][c] = true;
            while (!queue.empty()) {
                auto current = queue.front(); queue.pop();
                for (const auto& d : directions) {
                    int x = current.first + d[0], y = current.second + d[1];
                    if (x >= 0 && x < rows && y >= 0 && y < cols && grid[x][y] == '1' && !seen[x][y]) {
                        seen[x][y] = true;
                        queue.push({x,y});
                    }
                }
            }
        }
    }
    return islands;
}
```

## 5. 複雜度與延伸

每格至多入隊一次，每格檢查四個方向，所以時間 O(RC)，seen 與 queue 最差 O(RC)。若可直接修改原圖，能省掉 seen，但 queue 仍可能線性，不能宣稱整體 O(1) 空間。延伸到一般群組計數時可用圖走訪或並查集。

先遮住程式，口頭說明狀態、每輪操作及不漏解的原因，再使用一個邊界例子手動追蹤。需要更多比較時，回到[對應模板](/templates/bfs-dfs)。

[前往 LeetCode 練這題](https://leetcode.com/problems/number-of-islands/)
