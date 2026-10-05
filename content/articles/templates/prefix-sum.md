以下每組獨立使用，預設 C++，可切換 Python、Java。C++ 使用 `#include <bits/stdc++.h>`、`using namespace std;`；Java 使用 `import java.util.*;`。ListNode、TreeNode 由平台提供。

## Prefix Sum：區間和

prefix[i] = nums[0..i)，閉區間 [left, right] 的和為 prefix[right + 1] − prefix[left]。建立時間與空間 O(n)，查詢 O(1)。Prefix Sum + HashMap 的完整變形見本頁下方；Product Except Self 使用乘積，不能照抄加法。

```python
def buildPrefix(nums):
    prefix = [0] * (len(nums) + 1)
    for i in range(len(nums)):
        prefix[i + 1] = prefix[i] + nums[i]
    return prefix
```

```java
class Solution {
    public long[] buildPrefix(int[] nums) {
        long[] prefix = new long[nums.length + 1];
        for (int i = 0; i < nums.length; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        return prefix;
    }
}
```

```cpp
vector<long long> buildPrefix(const vector<int>& nums) {
    vector<long long> prefix(nums.size() + 1, 0);
    for (int i = 0; i < static_cast<int>(nums.size()); i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }
    return prefix;
}
```

## Prefix Sum + HashMap：Subarray Sum Equals K

目前 prefix 為 sum，查先前有幾個 prefix 等於 sum − k。初始化 `frequency[0] = 1`，先查再新增，避免把空區間算入。可處理負數與 0；平均時間 O(n)，空間 O(n)。一般 Range Sum 用長度 n + 1 的 prefix，區間 [l, r) 為 prefix[r] − prefix[l]。

```python
def subarraySum(nums, k):
    frequency = {0: 1}
    total = 0
    answer = 0
    for x in nums:
        total += x
        answer += frequency.get(total - k, 0)
        frequency[total] = frequency.get(total, 0) + 1
    return answer
```

```java
class Solution {
    public long subarraySum(int[] nums, long k) {
        Map<Long, Long> frequency = new HashMap<>();
        frequency.put(0L, 1L);
        long sum = 0, answer = 0;
        for (int x : nums) {
            sum += x;
            answer += frequency.getOrDefault(sum - k, 0L);
            frequency.put(sum, frequency.getOrDefault(sum, 0L) + 1);
        }
        return answer;
    }
}
```

```cpp
long long subarraySum(const vector<int>& nums, long long k) {
    unordered_map<long long, long long> frequency;
    frequency[0] = 1;
    long long sum = 0, answer = 0;
    for (int x : nums) {
        sum += x;
        auto it = frequency.find(sum - k);
        if (it != frequency.end()) answer += it->second;
        ++frequency[sum];
    }
    return answer;
}
```

Product of Array Except Self 使用前綴與後綴乘積，不是累加和；要另外注意 0 與乘積溢位。
