代表題：LeetCode 198。以下聚焦思考步驟，題目全文與測資請前往外部平台。

## 1. 辨識：先確認資料與目標

每個位置可選或不選，但不能選相鄰位置，要最大化總額。問題有重疊的前綴／後綴最佳值，不需要列出所有組合。輸入金額非負，可一個位置都不選。

## 2. 暴力解：建立可驗證的基準

每個位置分為選或不選，遞迴 enumerate 所有合法組合。不同路徑會重複計算相同剩餘範圍，時間呈指數成長；只因每層選擇少並不會變成線性。

## 3. 關鍵觀察：為什麼能減少重複工作？

令 dp[i] 為前 i 個位置的最大總額。最後一個位置不選時是 dp[i-1]，選時只能接 dp[i-2]+nums[i-1]。兩種取最大；初始空前綴為 0。

例 [3,2,5]：前綴最佳依序 3、3、8。只需保留前兩個狀態，先算 current，再把舊 prev1 移給 prev2。若先更新 prev2，再用它加目前值，可能錯選相鄰位置。

## 4. 虛擬碼與三語言參考實作

```text
prev2=0, prev1=0
對每個 value：
  current=max(prev1, prev2+value)
  prev2=prev1
  prev1=current
回傳 prev1
```

```python
def rob_bottom_up(nums):
    prev2 = prev1 = 0  # 空前綴
    for value in nums:
        current = max(prev1, prev2 + value)  # 使用舊狀態
        prev2, prev1 = prev1, current
    return prev1
```

```java
class Solution {
    public long robBottomUp(int[] nums) {
        long prev2 = 0, prev1 = 0;
        for (int value : nums) {
            long current = Math.max(prev1, prev2 + value);
            prev2 = prev1; // current 已算好才能推進
            prev1 = current;
        }
        return prev1;
    }
}
```

```cpp
#include <vector>
#include <algorithm>
long long robBottomUp(const std::vector<int>& nums) {
    long long prev2 = 0, prev1 = 0;
    for (int value : nums) {
        long long current = std::max(prev1, prev2 + value);
        prev2 = prev1; // 先以舊狀態算 current
        prev1 = current;
    }
    return prev1;
}
```

## 5. 複雜度與延伸

n 個元素各做常數運算，時間 O(n)、額外空間 O(1)。top-down memoization 也是 O(n) 時間，但快取與 stack 需要 O(n)。本題是相鄰限制；背包的容量狀態與可否重複取用需要另行定義。

先遮住程式，口頭說明狀態、每輪操作及不漏解的原因，再使用一個邊界例子手動追蹤。需要更多比較時，回到[對應模板](/templates/dp)。

[前往 LeetCode 練這題](https://leetcode.com/problems/house-robber/)
