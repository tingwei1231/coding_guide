以下每組獨立使用，預設 C++，可切換 Python、Java。C++ 使用 `#include <bits/stdc++.h>`、`using namespace std;`；Java 使用 `import java.util.*;`。ListNode、TreeNode 由平台提供。

## Stack：括號配對

不變量：stack 只包含尚未配對的開括號，下一個閉括號須配對堆頂。此範例輸入限 ()[]{}；空字串合法。時間 O(n)，空間 O(n)。

```python
def isValid(s):
    stack = []
    opening = set("([{")
    pairs = {")": "(", "]": "[", "}": "{"}
    for ch in s:
        if ch in opening:
            stack.append(ch)
        else:
            if not stack or stack.pop() != pairs.get(ch):
                return False
    return not stack
```

```java
class Solution {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char ch : s.toCharArray()) {
            if (ch == '(' || ch == '[' || ch == '{') stack.push(ch);
            else {
                if (stack.isEmpty()) return false;
                char top = stack.pop();
                if (!((top == '(' && ch == ')') ||
                      (top == '[' && ch == ']') ||
                      (top == '{' && ch == '}'))) return false;
            }
        }
        return stack.isEmpty();
    }
}
```

```cpp
bool isValid(const string& s) {
    stack<char> pending;
    for (char ch : s) {
        if (ch == '(' || ch == '[' || ch == '{') pending.push(ch);
        else {
            if (pending.empty()) return false;
            char top = pending.top();
            pending.pop();
            if (!((top == '(' && ch == ')') ||
                  (top == '[' && ch == ']') ||
                  (top == '{' && ch == '}'))) return false;
        }
    }
    return pending.empty();
}
```
