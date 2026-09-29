代表題：LeetCode 78。以下聚焦思考步驟，題目全文與測資請前往外部平台。

## 1. 辨識：先確認資料與目標

題目要求列出所有子集合，元素值互不相同，選取順序不影響同一個結果。這是決策枚舉，而不是找單一最佳值；輸出本身就可能是指數大小。

## 2. 暴力解：建立可驗證的基準

對 n 个元素列舉 0 到 2^n-1 的位元遮罩；每個遮罩掃描 n 位建立集合，時間 O(n·2^n)。這已符合輸出量級，但固定掃過全部位置，也不方便在部分路徑就依限制剪枝。

## 3. 關鍵觀察：為什麼能減少重複工作？

用 start 限制下一個選擇的位置，使每條路徑索引嚴格遞增，避免 [a,b] 與 [b,a] 重複。每次進入搜尋都存目前路徑複本；加入元素、深入、再撤銷。

例 [4,7]：保存 []，選 4 保存 [4]，再選 7 保存 [4,7]；退回後撤銷 7 和 4，再以 7 為第一項保存 [7]。回溯不是把最差複雜度降為多項式，而是讓決策與還原更清楚。

## 4. 虛擬碼與三語言參考實作

```text
search(start)：
  保存 path 的複本
  對 i=start..n-1：
    path 加入 nums[i]
    search(i+1)
    path 移除最後一項
以空 path 呼叫 search(0)
```

```python
def subsets(nums):
    result, path = [], []
    def search(start):
        result.append(path.copy())  # 保存複本，也包含空集合
        for i in range(start, len(nums)):
            path.append(nums[i])  # 選擇
            search(i + 1)  # 下層只往後選
            path.pop()  # 撤銷
    search(0)
    return result
```

```java
import java.util.*;
class Solution {
    private void search(int[] nums, int start, List<Integer> path, List<List<Integer>> result) {
        result.add(new ArrayList<>(path)); // 保存複本
        for (int i = start; i < nums.length; i++) {
            path.add(nums[i]);
            search(nums, i + 1, path, result);
            path.remove(path.size() - 1); // 撤銷
        }
    }
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        search(nums, 0, new ArrayList<>(), result);
        return result;
    }
}
```

```cpp
#include <vector>
#include <functional>
std::vector<std::vector<int>> subsets(const std::vector<int>& nums) {
    std::vector<std::vector<int>> result;
    std::vector<int> path;
    std::function<void(int)> search = [&](int start) {
        result.push_back(path); // 複製當前路徑
        for (int i = start; i < static_cast<int>(nums.size()); ++i) {
            path.push_back(nums[i]);
            search(i + 1);
            path.pop_back(); // 撤銷
        }
    };
    search(0);
    return result;
}
```

## 5. 複雜度與延伸

共有 2^n 個子集合，複製所有結果的總量為 O(n·2^n)；路徑與遞迴堆疊 O(n)，輸出另計 O(n·2^n)。若含重複值，要排序並同層跳過；若求排列，則需要不同的選擇規則與 used 狀態。

先遮住程式，口頭說明狀態、每輪操作及不漏解的原因，再使用一個邊界例子手動追蹤。需要更多比較時，回到[對應模板](/templates/backtracking)。

[前往 LeetCode 練這題](https://leetcode.com/problems/subsets/)
