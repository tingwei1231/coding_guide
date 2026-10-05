"""Locate published examples after moving them into their owning chapters."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
OPERATIONS = [["content/articles/data-structures/array.md","陣列與索引"],["content/articles/data-structures/string.md","字串與拼接"],["content/articles/data-structures/hashmap-set.md","hash map 與頻率"],["content/articles/data-structures/hashmap-set.md","集合與存在性"],["content/articles/data-structures/stack.md","stack：後進先出"],["content/articles/data-structures/queue.md","queue：先進先出"],["content/articles/data-structures/heap.md","priority queue：最小堆"],["content/articles/languages.md","排序與是否修改輸入"],["content/articles/data-structures/hashmap-set.md","HashSet：新增、刪除、清空"],["content/articles/data-structures/hashmap-set.md","HashMap：查詢、更新、刪除"],["content/articles/data-structures/hashmap-set.md","HashMap：走訪 key 與 value"],["content/articles/data-structures/array.md","動態陣列：尾端操作、刪除與複製"],["content/articles/data-structures/queue.md","Deque：兩端新增、讀取、刪除"],["content/articles/data-structures/heap.md","Heap：最大堆與查看堆頂"],["content/articles/languages.md","排序：自訂比較器與二維資料"],["content/articles/languages.md","二分邊界：第一個 ≥ 與第一個 >"],["content/articles/data-structures/string.md","字串：擷取、搜尋、反轉與數值轉換"],["content/articles/data-structures/graph.md","二維陣列與 Graph 鄰接表初始化"],["content/articles/data-structures/heap.md","Heap：複合資料與排序方向"],["content/articles/data-structures/hashmap-set.md","排序容器：有序 Set／Map 與下界"]]
NOTES = [["content/articles/templates/two-pointers.md","Two Pointers：原地壓縮"],["content/articles/templates/prefix-sum.md","Prefix Sum：區間和"],["content/articles/templates/stack.md","Stack：括號配對"],["content/articles/templates/monotonic-stack.md","Monotonic Stack：右側第一個更小"],["content/articles/templates/linked-list.md","Fast & Slow Pointers：環偵測"],["content/articles/templates/bfs-dfs.md","Tree DFS：由子樹回傳資訊"],["content/articles/templates/bfs-dfs.md","Tree BFS：逐層處理"],["content/articles/templates/bst.md","BST：傳遞嚴格上下界"],["content/articles/templates/bfs-dfs.md","Grid DFS / Flood Fill：格子就是圖"],["content/articles/templates/trie.md","Trie：共享字首"],["content/articles/templates/greedy.md","Greedy：先證明，再選局部最佳"],["content/articles/templates/dp.md","2D DP：兩個維度定義狀態"],["content/articles/templates/dp.md","Kadane：最大連續子陣列"],["content/articles/templates/bit-manipulation.md","Bit Manipulation：XOR 與移除最低的 1"],["content/articles/templates/matrix-simulation.md","Matrix Simulation：方向與邊界"]]

def extract(spec):
    result = {language: [] for language in ['python', 'java', 'cpp']}
    for path, title in spec:
        body = (ROOT / path).read_text(encoding='utf-8')
        sections = re.split(r'(?=^#{2,3} )', body, flags=re.M)
        section = next(s for s in sections if s.strip() and s.splitlines()[0].removeprefix('### ').removeprefix('## ').split('. ', 1)[-1] == title)
        for language in result:
            result[language].append(re.search(r'```' + language + r'\n(.*?)\n```', section, re.S).group(1))
    return result

def operation_blocks():
    return extract(OPERATIONS)

def note_blocks():
    return extract(NOTES)
