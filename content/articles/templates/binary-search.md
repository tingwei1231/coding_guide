依 [Pattern 總覽](/templates/pattern-notes)，二分搜尋的前提是搜尋空間或可行性判斷具有單調性，而不只是輸入已排序。

先回答：搜尋什麼？condition(mid) 是否單調？要確切值、第一個 true，還是最後一個 false？

- 確切值：閉區間 [left, right]，while left <= right，排除 mid 後更新 mid ± 1。
- 第一個 true：左閉右開 [left, right)，while left < right；true 時 right = mid，false 時 left = mid + 1，全部 false 回傳 n。
- 二分答案：check 的不可行／可行須形成單調分界。

不變量：可能的答案／分界留在尚未淘汰的搜尋空間。以下保留確切值、左右界、旋轉陣列與答案空間的完整實作，區間規則不能混用。
