代表題：LeetCode 11。以下聚焦思考步驟，題目全文與測資請前往外部平台。

## 1. 辨識：先確認資料與目標

答案由兩個位置構成，面積取決於距離及較短高度。高度不需要排序，且排序會破壞位置。目標是找出一個能安全淘汰端點的理由。

## 2. 暴力解：建立可驗證的基準

列舉所有 i<j，算 (j-i)*min(height[i],height[j])，保留最大值。共 n(n-1)/2 對，時間 O(n²)、額外空間 O(1)。這個版本也適合當小輸入的對照答案。

## 3. 關鍵觀察：為什麼能減少重複工作？

先算目前左右端面積。假如左端較短，固定左端、把右端往內移，寬度會縮小且有效高度不可能超過原左高，所以不能改善目前面積。左端已沒有更好搭配，安全淘汰它。

例 [2,5,3]：兩端面積 4，移除高度 2 的左端後面積為 3，答案仍是 4。不是每次移動都改善答案，而是每次都排除不會勝出的候選。相等高度可移任一側。

## 4. 虛擬碼與三語言參考實作

```text
left=0, right=n-1, best=0
當 left<right：
  best=max(best, 寬度*較短高度)
  若左高<=右高：left++
  否則：right--
回傳 best
```

```python
def max_area(height):
    left, right = 0, len(height) - 1
    best = 0
    while left < right:
        best = max(best, (right - left) * min(height[left], height[right]))
        if height[left] <= height[right]:  # 淘汰限制面積的短邊
            left += 1
        else:
            right -= 1
    return best
```

```java
class Solution {
    public long maxArea(int[] height) {
        int left = 0, right = height.length - 1;
        long best = 0;
        while (left < right) {
            best = Math.max(best, (long) (right - left) * Math.min(height[left], height[right]));
            if (height[left] <= height[right]) left++; // 移動短邊
            else right--;
        }
        return best;
    }
}
```

```cpp
#include <vector>
#include <algorithm>
long long maxArea(const std::vector<int>& height) {
    int left = 0, right = static_cast<int>(height.size()) - 1;
    long long best = 0;
    while (left < right) {
        best = std::max(best, static_cast<long long>(right - left) * std::min(height[left], height[right]));
        if (height[left] <= height[right]) ++left;
        else --right;
    }
    return best;
}
```

## 5. 複雜度與延伸

每輪移動一端，最多 n-1 輪，時間 O(n)、額外空間 O(1)。面積可能超過 int，本參考寫法以 64 位計算。排序兩數和也是對撞指標，但淘汰理由來自排序的總和上下界，不能混用。

先遮住程式，口頭說明狀態、每輪操作及不漏解的原因，再使用一個邊界例子手動追蹤。需要更多比較時，回到[對應模板](/templates/two-pointers)。

[前往 LeetCode 練這題](https://leetcode.com/problems/container-with-most-water/)
