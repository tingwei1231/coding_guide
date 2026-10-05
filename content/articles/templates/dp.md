依 [Pattern 總覽](/templates/pattern-notes)，依序定義 State → Transition → Base Case → Iteration Order → Answer。每個 dp[state] 必須有固定語意，計算前須確保依賴狀態已完成。

- 1D：前綴／後綴或選／不選；本頁 House Robber 比較 memoization 與 bottom-up。
- 2D：grid 或兩字串，以兩個維度共同決定狀態；本頁的 LCS 模板示範左、上、左上轉移。
- Kadane：以「當前位置結尾的最大和」做空間壓縮，也見本頁。

轉移依題目而異。0/1 背包的壓縮容量通常倒序，完全背包通常正序；不能把本頁的相鄰限制直接當成背包。

以下每組獨立使用，預設 C++，可切換 Python、Java。C++ 使用 `#include <bits/stdc++.h>`、`using namespace std;`；Java 使用 `import java.util.*;`。ListNode、TreeNode 由平台提供。

## 2D DP：兩個維度定義狀態

順序固定為 State → Transition → Base Case → Iteration Order → Answer。本例 LCS：dp[i][j] 是 a 前 i 個與 b 前 j 個字元的最長共同子序列長度；相同則左上 + 1，不同則 max(上, 左)。空前綴為 0，按列往右計算。時間與空間 O(mn)，字串限定 ASCII；grid DP、Edit Distance 使用不同轉移，不能直接照抄。

```python
def longestCommonSubsequence(a, b):
    dp = [[0] * (len(b) + 1) for _ in range(len(a) + 1)]
    for i in range(1, len(a) + 1):
        for j in range(1, len(b) + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[len(a)][len(b)]
```

```java
class Solution {
    public int longestCommonSubsequence(String a, String b) {
        int[][] dp = new int[a.length() + 1][b.length() + 1];
        for (int i = 1; i <= a.length(); i++) {
            for (int j = 1; j <= b.length(); j++) {
                if (a.charAt(i - 1) == b.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
        return dp[a.length()][b.length()];
    }
}
```

```cpp
int longestCommonSubsequence(const string& a, const string& b) {
    int m = static_cast<int>(a.size()), n = static_cast<int>(b.size());
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (a[i - 1] == b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
            else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    return dp[m][n];
}
```

## Kadane：最大連續子陣列

current 是「以目前位置結尾」的最大和，best 是所有已處理位置的最大和。每一步選擇重新從 x 開始，或延續前面區間。不可用 0 初始化，否則全負數會錯；空輸入明確拋錯。時間 O(n)，空間 O(1)。

```python
def maxSubArray(nums):
    if not nums:
        raise ValueError("empty input")
    current = best = nums[0]
    for i in range(1, len(nums)):
        x = nums[i]
        current = max(x, current + x)
        best = max(best, current)
    return best
```

```java
class Solution {
    public long maxSubArray(int[] nums) {
        if (nums.length == 0) throw new IllegalArgumentException("empty input");
        long current = nums[0], best = nums[0];
        for (int i = 1; i < nums.length; i++) {
            current = Math.max(nums[i], current + nums[i]);
            best = Math.max(best, current);
        }
        return best;
    }
}
```

```cpp
long long maxSubArray(const vector<int>& nums) {
    if (nums.empty()) throw invalid_argument("empty input");
    long long current = nums[0], best = nums[0];
    for (int i = 1; i < static_cast<int>(nums.size()); i++) {
        current = max(static_cast<long long>(nums[i]), current + nums[i]);
        best = max(best, current);
    }
    return best;
}
```
