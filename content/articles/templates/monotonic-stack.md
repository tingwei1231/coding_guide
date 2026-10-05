以下每組獨立使用，預設 C++，可切換 Python、Java。C++ 使用 `#include <bits/stdc++.h>`、`using namespace std;`；Java 使用 `import java.util.*;`。ListNode、TreeNode 由平台提供。

## Monotonic Stack：右側第一個更小

以新文件的遞增 stack 為基本方向，存索引、彈出條件為 nums[top] > nums[i]。以下回傳右側第一個嚴格更小元素的索引，無解為 −1；相等不彈出。每個索引最多進出一次，時間與空間 O(n)。Daily Temperatures 找更大值，須反轉比較方向，完整模板見本頁。

```python
def nextSmaller(nums):
    answer = [-1] * len(nums)
    stack = []
    for i, x in enumerate(nums):
        while stack and nums[stack[-1]] > x:
            answer[stack.pop()] = i
        stack.append(i)
    return answer
```

```java
class Solution {
    public int[] nextSmaller(int[] nums) {
        int[] answer = new int[nums.length];
        Arrays.fill(answer, -1);
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < nums.length; i++) {
            while (!stack.isEmpty() && nums[stack.peek()] > nums[i]) {
                answer[stack.pop()] = i;
            }
            stack.push(i);
        }
        return answer;
    }
}
```

```cpp
vector<int> nextSmaller(const vector<int>& nums) {
    vector<int> answer(nums.size(), -1);
    stack<int> pending;
    for (int i = 0; i < static_cast<int>(nums.size()); i++) {
        while (!pending.empty() && nums[pending.top()] > nums[i]) {
            answer[pending.top()] = i;
            pending.pop();
        }
        pending.push(i);
    }
    return answer;
}
```

## Stack / Monotonic Stack：下一個更大值

Daily Temperatures 存尚未找到較暖天氣的索引，保持溫度單調不遞增。相同溫度不彈出。每個索引最多進出一次，時間 O(n)，空間 O(n)。呼叫 `top()` 或 `pop()` 前必須確認非空。

```python
def dailyTemperatures(temperatures):
    answer = [0] * len(temperatures)
    pending = []
    for i in range(len(temperatures)):
        while pending and temperatures[i] > temperatures[pending[-1]]:
            previous = pending.pop()
            answer[previous] = i - previous
        pending.append(i)
    return answer
```

```java
class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int[] answer = new int[temperatures.length];
        Deque<Integer> pending = new ArrayDeque<>();
        for (int i = 0; i < temperatures.length; i++) {
            while (!pending.isEmpty() && temperatures[i] > temperatures[pending.peek()]) {
                int previous = pending.pop();
                answer[previous] = i - previous;
            }
            pending.push(i);
        }
        return answer;
    }
}
```

```cpp
vector<int> dailyTemperatures(const vector<int>& temperatures) {
    vector<int> answer(temperatures.size(), 0);
    stack<int> pending;
    for (int i = 0; i < static_cast<int>(temperatures.size()); ++i) {
        while (!pending.empty() && temperatures[i] > temperatures[pending.top()]) {
            int previous = pending.top();
            pending.pop();
            answer[previous] = i - previous;
        }
        pending.push(i);
    }
    return answer;
}
```

一般括號配對改存開括號；RPN 改存運算值，彈出時先取右運算元再取左運算元。延伸閱讀：[Stack](/data-structures/stack)。
