代表題：LeetCode 209。以下聚焦思考步驟，題目全文與測資請前往外部平台。

## 1. 辨識：先確認資料與目標

辨識線索是「連續區間」「總和達標」「長度最短」，還要確認每個元素為正整數，target>0。因為加入正數只會使總和變大，移除左端只會變小，才可以用單向 window。若允許負數，這個推理不成立。

## 2. 暴力解：建立可驗證的基準

enumerate 每個起點，再逐一延伸終點並累加總和；每個區間都能判斷是否合法。總共有 O(n²) 個候選，額外空間 O(1)。若每次又重算整段總和會更慢，應先避免這個重複工作。

## 3. 關鍵觀察：為什麼能減少重複工作？

不用為每個起點重算。右端每次加入一個值，總和一達標就先記答案，再縮左端。例 target=5、nums=[2,1,4]：加入 4 後總和 7，先記長度 3；移除 2 後仍達標，記長度 2；再移除 1 則不合法，停止收縮。答案 2。

這和找最長的時機相反：找最長是違規才收縮，找最短是合法時積極縮短。若 nums=[1,-1,5]，總和模板可能漏掉 [5]，負數是重要反例。

## 4. 虛擬碼與三語言參考實作

```text
left=0, total=0, best=無限大
逐一擴張 right：
  total 加入 nums[right]
  當 total >= target：
    best 更新為目前長度的較小值
    total 移除 nums[left]，left 前進
無解回傳 0，否則回傳 best
```

```python
def min_sub_array_len(target, nums):
    left = total = 0
    best = len(nums) + 1  # 尚未找到答案
    for right, value in enumerate(nums):
        total += value  # 先擴張
        while total >= target:  # 滿足條件才收縮
            best = min(best, right - left + 1)  # 移除前記錄合法答案
            total -= nums[left]
            left += 1
    return 0 if best == len(nums) + 1 else best
```

```java
class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int left = 0, best = nums.length + 1; // 未找到的哨兵
        long total = 0;
        for (int right = 0; right < nums.length; right++) {
            total += nums[right];
            while (total >= target) { // 合法時繼續嘗試縮短
                best = Math.min(best, right - left + 1); // 先記答案
                total -= nums[left++];
            }
        }
        return best == nums.length + 1 ? 0 : best;
    }
}
```

```cpp
#include <vector>
#include <algorithm>
int minSubArrayLen(int target, const std::vector<int>& nums) {
    int left = 0, best = static_cast<int>(nums.size()) + 1;
    long long total = 0; // 避免 int 總和溢位
    for (int right = 0; right < static_cast<int>(nums.size()); ++right) {
        total += nums[right];
        while (total >= target) { // 合法時繼續嘗試縮短
            best = std::min(best, right - left + 1); // 移除前記答案
            total -= nums[left++];
        }
    }
    return best == static_cast<int>(nums.size()) + 1 ? 0 : best;
}
```

## 5. 複雜度與延伸

左右端各最多走 n 次，因此總時間 O(n)，額外空間 O(1)。不要因 while 寫在 for 內就判為 O(n²)。可延伸到覆蓋所有字元，但需把總和狀態換成頻率與缺額。

先遮住程式，口頭說明狀態、每輪操作及不漏解的原因，再使用一個邊界例子手動追蹤。需要更多比較時，回到[對應模板](/templates/sliding-window#variation-frequency-count)。

[前往 LeetCode 練這題](https://leetcode.com/problems/minimum-size-subarray-sum/)
