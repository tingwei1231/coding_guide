代表題：LeetCode 875。以下聚焦思考步驟，題目全文與測資請前往外部平台。

## 1. 辨識：先確認資料與目標

「找最小速度」不是充分條件。先問：若速度 k 可以完成，任何更大的速度是否也可以？在每小時只處理一堆、每堆為正整數且 h 不少於堆數的條件下，答案是肯定的。

## 2. 暴力解：建立可驗證的基準

從速度 1 一直試到最大堆 M。每個速度掃過 n 堆，計算總小時數，第一個可行速度就是答案。時間 O(nM)、額外空間 O(1)；當 M 很大，逐一 enumerate 速度不可行。

## 3. 關鍵觀察：為什麼能減少重複工作？

可行性是 false→true 的單調序列。check(k)=所有 ceil(p/k) 的總和是否 <=h。可以二分速度範圍 [1,M]，而不是先排序堆。例 piles=[2,5], h=4：速度 1 需 7 小時不可行；速度 2 需 4 小時可行，所以最小速度為 2。

中點可行時仍可能有更小答案，因此 right=mid；不可行時排除 mid 與更小速度，left=mid+1。若 h 小於堆數，原本「右端保證可行」的前提就不成立。

## 4. 虛擬碼與三語言參考實作

```text
left=1, right=max(piles)
當 left<right：
  mid=區間中點
  hours=sum(ceil(p/mid))
  若 hours<=h：right=mid
  否則：left=mid+1
回傳 left
```

```python
def min_eating_speed(piles, h):
    def feasible(speed):
        return sum((p + speed - 1) // speed for p in piles) <= h
    left, right = 1, max(piles)  # 已知右端可行
    while left < right:
        mid = left + (right - left) // 2
        if feasible(mid):  # 找第一個 true
            right = mid
        else:
            left = mid + 1
    return left
```

```java
class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int left = 1, right = 1;
        for (int p : piles) right = Math.max(right, p); // 可行上界
        while (left < right) {
            int mid = left + (right - left) / 2;
            long hours = 0;
            for (int p : piles) hours += (p + (long) mid - 1) / mid; // 向上取整
            if (hours <= h) right = mid; // 可行，仍保留 mid
            else left = mid + 1;
        }
        return left;
    }
}
```

```cpp
#include <vector>
#include <algorithm>
int minEatingSpeed(const std::vector<int>& piles, int h) {
    int left = 1, right = *std::max_element(piles.begin(), piles.end());
    while (left < right) {
        int mid = left + (right - left) / 2;
        long long hours = 0;
        for (int p : piles) hours += (p + static_cast<long long>(mid) - 1) / mid;
        if (hours <= h) right = mid; // 可行，搜尋更小速度
        else left = mid + 1;
    }
    return left;
}
```

## 5. 複雜度與延伸

每次 check 掃描 n 堆，速度範圍減半約 log M 次，時間 O(n log M)、額外空間 O(1)。Java/C++ 用 64 位累加小時數。運貨容量也可二分，但其 check 要依原順序貪心分天，不能照搬小時公式。

先遮住程式，口頭說明狀態、每輪操作及不漏解的原因，再使用一個邊界例子手動追蹤。需要更多比較時，回到[對應模板](/templates/binary-search)。

[前往 LeetCode 練這題](https://leetcode.com/problems/koko-eating-bananas/)
