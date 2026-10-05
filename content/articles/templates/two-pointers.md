依 [Pattern 總覽](/templates/pattern-notes)，先區分「左右夾逼」與「快慢指標原地修改」。

- 左右夾逼：每次淘汰一端都須證明不會漏解；若答案仍存在，就還在未排除的範圍。
- 原地修改：slow 是寫入位置，fast 是讀取位置；nums[0, slow) 始終是已保留的有效元素。

下面保留排序兩數和與完整變形。排序 pair 依賴有序性；容器題依賴短邊上限，不能先排序高度。原地壓縮骨架見本頁，鏈結串列找環比較節點身份。

以下每組獨立使用，預設 C++，可切換 Python、Java。C++ 使用 `#include <bits/stdc++.h>`、`using namespace std;`；Java 使用 `import java.util.*;`。ListNode、TreeNode 由平台提供。

## Two Pointers：原地壓縮

不變量：nums[0, slow) 是已保留的元素。移除值等於 target 的元素，回傳有效長度；尾端內容不屬於答案。時間 O(n)，空間 O(1)。

```python
def removeElement(nums, target):
    slow = 0
    for fast in range(len(nums)):
        if nums[fast] != target:
            nums[slow] = nums[fast]
            slow += 1
    return slow
```

```java
class Solution {
    public int removeElement(int[] nums, int target) {
        int slow = 0;
        for (int fast = 0; fast < nums.length; fast++) {
            if (nums[fast] != target) nums[slow++] = nums[fast];
        }
        return slow;
    }
}
```

```cpp
int removeElement(vector<int>& nums, int target) {
    int slow = 0;
    for (int fast = 0; fast < static_cast<int>(nums.size()); fast++) {
        if (nums[fast] != target) nums[slow++] = nums[fast];
    }
    return slow;
}
```
