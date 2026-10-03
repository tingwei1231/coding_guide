依 [Pattern 總覽](/templates/pattern-notes)，先區分樹的子問題與圖的重訪控制。

- Tree DFS：先定義回傳給 parent 的資訊，再合併左右子樹；空節點回傳 base case。
- Tree BFS：空 root 先返回，每層固定 level_size，避免新增 child 混入本層。
- Graph DFS：進入後先標記 visited，再展開鄰居。
- Graph BFS：入列時就標記 visited，queue 依距離擴張，適用無權圖最少邊數。
- Grid DFS：先檢查邊界、是否可走與 visited，再標記並走四方向。

以下鄰接表模板只走訪起點可達範圍，不會自動處理其他連通分量。樹、BST 與 Flood Fill 的三語言模板見總覽，Kahn 拓撲排序見[高頻模板練習題](/templates/cpp-review)。深圖可能超出遞迴堆疊，需改用顯式 stack。
