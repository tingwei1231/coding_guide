以下每組獨立使用，預設 C++，可切換 Python、Java。C++ 使用 `#include <bits/stdc++.h>`、`using namespace std;`；Java 使用 `import java.util.*;`。ListNode、TreeNode 由平台提供。

## Trie：共享字首

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
