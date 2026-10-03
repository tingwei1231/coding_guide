先辨識題型 → 選模板 → 定義不變量 → 檢查邊界。本頁依提供的 `leetcode-150-pattern-templates.md` 統整；相同 Pattern 採用該文件的核心骨架，已有完整實作則直接連結，避免重複。

## Pattern 快速索引

| Pattern | 題目訊號／核心不變量 | 模板 |
|---|---|---|
| Two Pointers | sorted + pair／排除區域不再含答案；原地修改／有效前綴 | [左右夾逼](/templates/two-pointers)；下方原地壓縮 |
| Sliding Window | 連續區間／左右界維持合法條件 | [可變長度、最長與最短](/templates/sliding-window) |
| Hash Map / Set | 查找、頻率、去重／記錄已處理元素 | [Complement Lookup](/templates/cpp-review)；[Frequency Map](/languages) |
| Prefix Sum | 區間和／prefix[i] 是前 i 個元素的累加 | 下方區間和；[Prefix + HashMap](/templates/cpp-review) |
| Binary Search | 單調搜尋空間／答案留在未淘汰區間 | [確切值、第一個 true](/templates/binary-search) |
| Interval | 重疊、合併／排序後維護已合併區間 | [Merge 模板](/templates/cpp-review) |
| Stack | 配對、巢狀／未處理元素依 LIFO 排列 | 下方括號配對 |
| Monotonic Stack | next / previous greater / smaller／維持指定單調性 | 下方遞增 stack |
| Linked List | 反轉、合併、刪除／改 next 前保存原鏈結 | [反轉](/templates/cpp-review)；dummy node |
| Fast & Slow Pointers | 環、中點／固定相對速度 | 下方環偵測 |
| Tree DFS | 子樹、路徑／每次回傳明確的子問題資訊 | 下方 Bottom-Up DFS |
| Tree BFS | 層序／本輪只處理固定的一層 | 下方 Level Order |
| BST | 有序樹／祖先上下界或中序遞增 | 下方上下界驗證 |
| Graph DFS / BFS | 連通、可達／每個節點只訪問一次 | [鄰接表走訪](/templates/bfs-dfs) |
| Grid DFS / Flood Fill | 格子連通／標記後不再訪問 | 下方四方向 DFS |
| Topological Sort | dependency／入度 0 才能處理 | [Kahn 模板](/templates/cpp-review) |
| Trie | prefix、字典查詢／路徑代表字首 | 下方 insert / search |
| Backtracking | 所有組合、排列／path 是目前有效選擇 | [choose → recurse → undo](/templates/backtracking) |
| Heap | Top K、動態最值／只保留合格候選 | [容量 k 的 min heap](/templates/cpp-review) |
| Greedy | 局部最優／已做選擇不破壞最佳解 | 下方證明與 Jump Game |
| 1D DP | 前綴、選／不選／dp[i] 有固定語意 | [狀態與轉移](/templates/dp) |
| 2D DP | grid、兩字串／狀態由兩維決定 | 下方 LCS |
| Kadane | 最大連續和／current 必須以目前位置結尾 | 下方重新開始或延續 |
| Bit Manipulation | XOR、位元計數／位元代數 | 下方 XOR / set bits |
| Matrix Simulation | 矩陣走訪／方向、邊界、順序 | 下方鄰居骨架 |

## 套用前的四個問題

1. 答案是 pair、區間、路徑，還是所有組合？
2. 有序、單調、連續、依賴等條件是否成立？
3. 模板維護什麼狀態？每次更新後要保證什麼？
4. 空輸入、相等值、溢位與資料規模會不會破壞前提？

## 補充模板（三語言）

以下將原文件的抽象骨架具體化為可練習的函式，預設 C++，可切換 Python、Java。C++ 使用 `#include <bits/stdc++.h>`、`using namespace std;`；Java 使用 `import java.util.*;`。每組獨立使用；ListNode、TreeNode 由題目平台提供。

### 1. Two Pointers：原地壓縮

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

### 2. Prefix Sum：區間和

prefix[i] = nums[0..i)，閉區間 [left, right] 的和為 prefix[right + 1] − prefix[left]。建立時間與空間 O(n)，查詢 O(1)。Prefix Sum + HashMap 的完整變形見[高頻模板練習題](/templates/cpp-review)；Product Except Self 使用乘積，不能照抄加法。

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

### 3. Stack：括號配對

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

### 4. Monotonic Stack：右側第一個更小

以新文件的遞增 stack 為基本方向，存索引、彈出條件為 nums[top] > nums[i]。以下回傳右側第一個嚴格更小元素的索引，無解為 −1；相等不彈出。每個索引最多進出一次，時間與空間 O(n)。Daily Temperatures 找更大值，須反轉比較方向，見[高頻模板練習題](/templates/cpp-review)。

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

### 5. Fast & Slow Pointers：環偵測

每輪 slow 走一步、fast 走兩步，環內相對距離每次縮短一步。比較節點身份，不是節點值；先確認 fast 與 fast.next。時間 O(n)，空間 O(1)。刪除或合併鏈結串列時，dummy node 可統一 head 被修改的情況。

```python
def hasCycle(head):
    slow = fast = head
    while fast is not None and fast.next is not None:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False
```

```java
class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}
```

```cpp
bool hasCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}
```

### 6. Tree DFS：由子樹回傳資訊

先定義 DFS 回傳值。本例回傳子樹高度：空節點為 0，當前為 1 + max(left, right)。時間 O(n)，遞迴空間 O(h)，深樹需考慮顯式 stack。最大路徑和等題目需區分「回傳給 parent 的單側資訊」與「更新全域答案的雙側資訊」。

```python
def maxDepth(node):
    if node is None:
        return 0
    left = maxDepth(node.left)
    right = maxDepth(node.right)
    return 1 + max(left, right)
```

```java
class Solution {
    public int maxDepth(TreeNode node) {
        if (node == null) return 0;
        int left = maxDepth(node.left);
        int right = maxDepth(node.right);
        return 1 + Math.max(left, right);
    }
}
```

```cpp
int maxDepth(TreeNode* node) {
    if (node == nullptr) return 0;
    int left = maxDepth(node->left);
    int right = maxDepth(node->right);
    return 1 + max(left, right);
}
```

### 7. Tree BFS：逐層處理

每層開始固定 queue.size()，避免新增的 child 混入本層。先處理空 root；時間 O(n)，空間 O(w)，w 是最大層寬。

```python
from collections import deque

def levelOrder(root):
    if root is None:
        return []
    queue = deque([root])
    result = []
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left is not None:
                queue.append(node.left)
            if node.right is not None:
                queue.append(node.right)
        result.append(level)
    return result
```

```java
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        Queue<TreeNode> queue = new ArrayDeque<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                level.add(node.val);
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            result.add(level);
        }
        return result;
    }
}
```

```cpp
vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> result;
    if (root == nullptr) return result;
    queue<TreeNode*> pending;
    pending.push(root);
    while (!pending.empty()) {
        int levelSize = static_cast<int>(pending.size());
        vector<int> level;
        for (int i = 0; i < levelSize; i++) {
            TreeNode* node = pending.front();
            pending.pop();
            level.push_back(node->val);
            if (node->left != nullptr) pending.push(node->left);
            if (node->right != nullptr) pending.push(node->right);
        }
        result.push_back(level);
    }
    return result;
}
```

### 8. BST：傳遞嚴格上下界

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

### 9. Grid DFS / Flood Fill：格子就是圖

四方向代表邊；先檢查邊界與格子是否可走，再標記，最後探索鄰居。本例只處理矩形整數 grid，把連通的原色改成新色；若顏色相同直接返回，避免重訪。時間與最壞遞迴空間 O(rows × cols)。

```python
def floodFill(grid, sr, sc, color):
    if not grid or not grid[0] or not (0 <= sr < len(grid) and 0 <= sc < len(grid[0])):
        return grid
    old = grid[sr][sc]
    if old == color:
        return grid
    def dfs(r, c):
        if not (0 <= r < len(grid) and 0 <= c < len(grid[0])):
            return
        if grid[r][c] != old:
            return
        grid[r][c] = color
        for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
            dfs(r + dr, c + dc)
    dfs(sr, sc)
    return grid
```

```java
class Solution {
    private void dfs(int[][] grid, int r, int c, int old, int color) {
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length) return;
        if (grid[r][c] != old) return;
        grid[r][c] = color;
        int[][] directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        for (int[] d : directions) dfs(grid, r + d[0], c + d[1], old, color);
    }
    public int[][] floodFill(int[][] grid, int sr, int sc, int color) {
        if (grid.length == 0 || grid[0].length == 0 ||
            sr < 0 || sr >= grid.length || sc < 0 || sc >= grid[0].length) return grid;
        int old = grid[sr][sc];
        if (old != color) dfs(grid, sr, sc, old, color);
        return grid;
    }
}
```

```cpp
vector<vector<int>> floodFill(vector<vector<int>>& grid, int sr, int sc, int color) {
    if (grid.empty() || grid[0].empty() ||
        sr < 0 || sr >= static_cast<int>(grid.size()) ||
        sc < 0 || sc >= static_cast<int>(grid[0].size())) return grid;
    int old = grid[sr][sc];
    if (old == color) return grid;
    const int directions[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
    function<void(int, int)> dfs = [&](int r, int c) {
        if (r < 0 || r >= static_cast<int>(grid.size()) ||
            c < 0 || c >= static_cast<int>(grid[0].size()) || grid[r][c] != old) return;
        grid[r][c] = color;
        for (const auto& d : directions) dfs(r + d[0], c + d[1]);
    };
    dfs(sr, sc);
    return grid;
}
```

### 10. Trie：共享字首

children 代表下一個字元，isWord 區分「完整單字」與「只是一段 prefix」。insert、search、startsWith 都沿字元前進，單次 O(L)，總空間 O(總字元數)。範例限定小寫 a–z，空字串也是可插入的單字；C++ 用 unique_ptr 管理節點。

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_word = True

    def find(self, text):
        node = self.root
        for ch in text:
            if ch not in node.children:
                return None
            node = node.children[ch]
        return node

    def search(self, word):
        node = self.find(word)
        return node is not None and node.is_word

    def startsWith(self, prefix):
        return self.find(prefix) is not None
```

```java
class Trie {
    private static class Node {
        Map<Character, Node> children = new HashMap<>();
        boolean isWord;
    }
    private final Node root = new Node();
    public void insert(String word) {
        Node node = root;
        for (char ch : word.toCharArray()) {
            node = node.children.computeIfAbsent(ch, key -> new Node());
        }
        node.isWord = true;
    }
    private Node find(String text) {
        Node node = root;
        for (char ch : text.toCharArray()) {
            node = node.children.get(ch);
            if (node == null) return null;
        }
        return node;
    }
    public boolean search(String word) {
        Node node = find(word);
        return node != null && node.isWord;
    }
    public boolean startsWith(String prefix) {
        return find(prefix) != null;
    }
}
```

```cpp
class Trie {
    struct Node {
        unordered_map<char, unique_ptr<Node>> children;
        bool isWord = false;
    };
    Node root;
    const Node* find(const string& text) const {
        const Node* node = &root;
        for (char ch : text) {
            auto it = node->children.find(ch);
            if (it == node->children.end()) return nullptr;
            node = it->second.get();
        }
        return node;
    }
public:
    void insert(const string& word) {
        Node* node = &root;
        for (char ch : word) {
            auto& child = node->children[ch];
            if (!child) child = make_unique<Node>();
            node = child.get();
        }
        node->isWord = true;
    }
    bool search(const string& word) const {
        const Node* node = find(word);
        return node != nullptr && node->isWord;
    }
    bool startsWith(const string& prefix) const {
        return find(prefix) != nullptr;
    }
};
```

### 11. Greedy：先證明，再選局部最佳

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

### 12. 2D DP：兩個維度定義狀態

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

### 13. Kadane：最大連續子陣列

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

### 14. Bit Manipulation：XOR 與移除最低的 1

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

### 15. Matrix Simulation：方向與邊界

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

## 常用 Pattern 組合

| 組合 | 要修改的狀態 |
|---|---|
| Prefix Sum + HashMap | 查找 sum − target，再記錄當前 prefix 次數 |
| DFS + Backtracking | 路徑探索後撤銷 visited／path |
| Trie + DFS | 用字首是否存在剪枝 |
| Binary Search + Greedy / Check | 二分答案，check 必須具有單調性 |
| Heap + Linked List | 每條有序串列只放目前最小候選，彈出後補 next |
| Tree DFS + Global Answer | 回傳可延伸的局部資訊，另外更新全域最佳 |
| Sort + Two Pointers | 排序後以單調性排除候選，留意原始索引 |
| Graph + Indegree | 以未完成的依賴數決定處理順序 |

## 文件建議優先級

| 優先級 | Pattern |
|---|---|
| Tier 1：基礎必熟 | Hash Map / Set、Two Pointers、Sliding Window、Binary Search、Stack、Linked List、Tree / Graph DFS / BFS、Backtracking、1D / 2D DP |
| Tier 2：高頻進階 | Prefix Sum、Interval、Heap、Greedy、Topological Sort、Monotonic Stack、BST |
| Tier 3：專門題型 | Trie、Bit Manipulation、Kadane、Matrix Simulation、Fast & Slow Pointers |

此處是新文件的通用面試學習順序；[刷題順序](/practice-order)保留兩週 HackerRank 的每日安排。
