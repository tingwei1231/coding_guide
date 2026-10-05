以下每組獨立使用，預設 C++，可切換 Python、Java。C++ 使用 `#include <bits/stdc++.h>`、`using namespace std;`；Java 使用 `import java.util.*;`。ListNode、TreeNode 由平台提供。

## Greedy：先證明，再選局部最佳

沒有通用 Greedy 程式碼。先問：局部選擇是什麼？會不會破壞未來？最佳解能否交換成包含這個選擇？本例 Jump Game 假設非負跳躍長度：只需保留最遠可達位置，較短範圍不提供更多選擇。時間 O(n)，空間 O(1)；空輸入回傳 false。無法安全淘汰其他狀態時，考慮 DP。

```python
def canJump(nums):
    if not nums:
        return False
    farthest = 0
    for i, jump in enumerate(nums):
        if i > farthest:
            return False
        farthest = max(farthest, i + jump)
        if farthest >= len(nums) - 1:
            return True
    return False
```

```java
class Solution {
    public boolean canJump(int[] nums) {
        if (nums.length == 0) return false;
        long farthest = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > farthest) return false;
            farthest = Math.max(farthest, (long) i + nums[i]);
            if (farthest >= nums.length - 1) return true;
        }
        return false;
    }
}
```

```cpp
bool canJump(const vector<int>& nums) {
    if (nums.empty()) return false;
    long long farthest = 0;
    for (int i = 0; i < static_cast<int>(nums.size()); i++) {
        if (i > farthest) return false;
        farthest = max(farthest, static_cast<long long>(i) + nums[i]);
        if (farthest >= static_cast<long long>(nums.size()) - 1) return true;
    }
    return false;
}
```
