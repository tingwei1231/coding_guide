以下每組獨立使用，預設 C++，可切換 Python、Java。C++ 使用 `#include <bits/stdc++.h>`、`using namespace std;`；Java 使用 `import java.util.*;`。ListNode、TreeNode 由平台提供。

## BST：傳遞嚴格上下界

所有子孫都必須滿足祖先的界限，不能只比較直接 children。假設節點值為 32 位整數且不允許重複值；Java/C++ 用 64 位上下界。時間 O(n)，空間 O(h)。中序走訪則須得到嚴格遞增序列。

```python
def isValidBST(root):
    def valid(node, low, high):
        if node is None:
            return True
        if not low < node.val < high:
            return False
        return valid(node.left, low, node.val) and valid(node.right, node.val, high)
    return valid(root, float("-inf"), float("inf"))
```

```java
class Solution {
    private boolean valid(TreeNode node, long low, long high) {
        if (node == null) return true;
        if (node.val <= low || node.val >= high) return false;
        return valid(node.left, low, node.val) && valid(node.right, node.val, high);
    }
    public boolean isValidBST(TreeNode root) {
        return valid(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
}
```

```cpp
bool validBST(TreeNode* node, long long low, long long high) {
    if (node == nullptr) return true;
    if (node->val <= low || node->val >= high) return false;
    return validBST(node->left, low, node->val) &&
           validBST(node->right, node->val, high);
}

bool isValidBST(TreeNode* root) {
    return validBST(root, LLONG_MIN, LLONG_MAX);
}
```
