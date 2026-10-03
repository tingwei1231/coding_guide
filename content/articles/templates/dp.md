依 [Pattern 總覽](/templates/pattern-notes)，依序定義 State → Transition → Base Case → Iteration Order → Answer。每個 dp[state] 必須有固定語意，計算前須確保依賴狀態已完成。

- 1D：前綴／後綴或選／不選；本頁 House Robber 比較 memoization 與 bottom-up。
- 2D：grid 或兩字串，以兩個維度共同決定狀態；[總覽的 LCS 模板](/templates/pattern-notes)示範左、上、左上轉移。
- Kadane：以「當前位置結尾的最大和」做空間壓縮，也見總覽。

轉移依題目而異。0/1 背包的壓縮容量通常倒序，完全背包通常正序；不能把本頁的相鄰限制直接當成背包。
