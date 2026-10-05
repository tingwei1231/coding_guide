以下每組獨立使用，預設 C++，可切換 Python、Java。C++ 使用 `#include <bits/stdc++.h>`、`using namespace std;`；Java 使用 `import java.util.*;`。ListNode、TreeNode 由平台提供。

## Fast & Slow Pointers：環偵測

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

## Linked List：反轉鏈結

先保留下一個節點，再改 `next`。時間 O(n)，額外空間 O(1)，會修改原鏈結；空串列回傳 `nullptr`。

```python
def reverseList(head):
    previous = None
    current = head
    while current is not None:
        next_node = current.next
        current.next = previous
        previous = current
        current = next_node
    return previous
```

```java
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode previous = null;
        ListNode current = head;
        while (current != null) {
            ListNode next = current.next;
            current.next = previous;
            previous = current;
            current = next;
        }
        return previous;
    }
}
```

```cpp
ListNode* reverseList(ListNode* head) {
    ListNode* previous = nullptr;
    ListNode* current = head;
    while (current != nullptr) {
        ListNode* next = current->next;
        current->next = previous;
        previous = current;
        current = next;
    }
    return previous;
}
```

Cycle 使用快慢指標；刪除倒數第 N 個節點常用 dummy node 與固定距離雙指標。延伸閱讀：[Linked List](/data-structures/linked-list)、[雙指標](/templates/two-pointers)。
