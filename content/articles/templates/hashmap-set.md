以下每組獨立使用，預設 C++，可切換 Python、Java。C++ 使用 `#include <bits/stdc++.h>`、`using namespace std;`；Java 使用 `import java.util.*;`。ListNode、TreeNode 由平台提供。

## HashMap：存在、次數、位置

Two Sum 先查補數再存目前位置，避免重複使用同一元素；Contains Duplicate 也使用 HashMap 記錄已出現的值。C++ 的 `target - nums[i]` 須在 `int` 範圍內。平均時間 O(n)，空間 O(n)；雜湊碰撞嚴重時時間可能退化。

```python
def twoSum(nums, target):
    seen = {}
    for i in range(len(nums)):
        need = target - nums[i]
        if need in seen:
            return [seen[need], i]
        seen[nums[i]] = i
    return []

def containsDuplicate(nums):
    seen = {}
    for i in range(len(nums)):
        if nums[i] in seen:
            return True
        seen[nums[i]] = seen.get(nums[i], 0) + 1
    return False
```

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int need = target - nums[i];
            if (seen.containsKey(need)) {
                return new int[]{seen.get(need), i};
            }
            seen.put(nums[i], i);
        }
        return new int[0];
    }

    public boolean containsDuplicate(int[] nums) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            if (seen.containsKey(nums[i])) {
                return true;
            }
            seen.put(nums[i], seen.getOrDefault(nums[i], 0) + 1);
        }
        return false;
    }
}
```

```cpp
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); i++) {
        int need = target - nums[i];
        if (seen.count(need)) {
            return {seen[need], i};
        }
        seen[nums[i]] = i;
    }
    return {};
}

bool containsDuplicate(vector<int>& nums) {
    unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); i++) {
        if (seen.count(nums[i])) {
            return true;
        }
        seen[nums[i]]++;
    }
    return false;
}
```

頻率用 `unordered_map<int, int> freq;` 與 `++freq[x];`；只查是否存在時用 `find` 或 `count`，避免 `operator[]` 意外新增 key。延伸閱讀：[HashMap / Set](/data-structures/hashmap-set)。
