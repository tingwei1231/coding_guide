以下每組獨立使用，預設 C++，可切換 Python、Java。C++ 使用 `#include <bits/stdc++.h>`、`using namespace std;`；Java 使用 `import java.util.*;`。ListNode、TreeNode 由平台提供。

## Matrix Simulation：方向與邊界

矩形矩陣的四方向鄰居骨架，回傳有效鄰居座標；時間與輸出空間 O(1)。完整模擬還須定義走訪順序與停止條件。Rotate Image、Spiral Matrix、Set Matrix Zeroes 的順序不同；修改內容可能污染後續判斷，必要時先記錄標記再統一修改。

```python
def neighbors(rows, cols, r, c):
    result = []
    for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
        nr, nc = r + dr, c + dc
        if 0 <= nr < rows and 0 <= nc < cols:
            result.append([nr, nc])
    return result
```

```java
class Solution {
    public List<int[]> neighbors(int rows, int cols, int r, int c) {
        int[][] directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        List<int[]> result = new ArrayList<>();
        for (int[] d : directions) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                result.add(new int[]{nr, nc});
            }
        }
        return result;
    }
}
```

```cpp
vector<pair<int, int>> neighbors(int rows, int cols, int r, int c) {
    const int directions[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
    vector<pair<int, int>> result;
    for (const auto& d : directions) {
        int nr = r + d[0], nc = c + d[1];
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
            result.push_back({nr, nc});
        }
    }
    return result;
}
```
