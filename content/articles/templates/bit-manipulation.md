以下每組獨立使用，預設 C++，可切換 Python、Java。C++ 使用 `#include <bits/stdc++.h>`、`using namespace std;`；Java 使用 `import java.util.*;`。ListNode、TreeNode 由平台提供。

## Bit Manipulation：XOR 與移除最低的 1

XOR：x ^ x = 0、x ^ 0 = x。Single Number 假設其他元素都恰好出現兩次，時間 O(n)，空間 O(1)。x & (x − 1) 每次清掉最低的 1，計數時間 O(1 的個數)。計數統一處理 32 位元無號表示；Python 先遮罩、Java int 視為位元模式、C++ 使用 uint32_t。

```python
def singleNumber(nums):
    answer = 0
    for x in nums:
        answer ^= x
    return answer

def hammingWeight(x):
    x &= 0xffffffff
    count = 0
    while x:
        x &= x - 1
        count += 1
    return count
```

```java
class Solution {
    public int singleNumber(int[] nums) {
        int answer = 0;
        for (int x : nums) answer ^= x;
        return answer;
    }
    public int hammingWeight(int x) {
        int count = 0;
        while (x != 0) {
            x &= x - 1;
            count++;
        }
        return count;
    }
}
```

```cpp
int singleNumber(const vector<int>& nums) {
    int answer = 0;
    for (int x : nums) answer ^= x;
    return answer;
}

int hammingWeight(uint32_t x) {
    int count = 0;
    while (x != 0) {
        x &= x - 1;
        count++;
    }
    return count;
}
```
