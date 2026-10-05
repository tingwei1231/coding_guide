## 定義

陣列以索引定位元素。固定陣列大小不變；動態陣列容量不足時會配置更大的區塊並搬移。Python list、Java ArrayList、C++ vector 都提供動態陣列式介面，但元素表示方式不同。

## 圖解

![Array 陣列 的結構示意：index 0: 4、index 1: 7、index 2: 9、index 3: 2](/diagrams/array.svg)

在 [4,7,9] 的索引 1 插入 5，要先搬動 7、9，得到 [4,5,7,9]。只更新 a[1] 則不需要搬移。

## 複雜度

| 操作 | 成本 | 前提與說明 |
|---|---|---|
| 索引讀寫 | O(1) | 已知有效索引 |
| 搜尋未排序元素 | O(n) | 可能看完所有元素 |
| 尾端新增 | 攤銷 O(1)，單次最差 O(n) | 動態陣列擴容時搬移 |
| 中間插入／刪除 | O(n) | 後續元素須位移 |
| 儲存 n 個元素 | O(n) | 未計每個元素指向的外部物件 |

## 適用情境

需要快速隨機存取、順序掃描或原地改寫時使用。排序後能配合二分；連續區間可考慮 sliding window。

## 常見誤區

索引是位置，不是元素值。刪除元素時邊走訪邊移位可能跳過下一項；不要把每次 append 都視為最差 O(1)。Python a[:] 是複製，不是常數空間視圖。

## 自我檢查與下一步

試著用自己的話回答：「這個結構保證哪些操作便宜？我是否把搜尋位置、複製或擴容的成本漏算了？」

前往[相關教材](/templates/two-pointers)，或回到[資料結構索引](/data-structures)。

## 三語言常用操作

### 陣列與索引

三者都以 0 起算。Python list、Java ArrayList、C++ vector 可增長；Java int[] 固定長度。下例以可增長容器建立 [4,7]，讀取首項。

```python
a = [4]
a.append(7)
first = a[0]
```

```java
java.util.List<Integer> a = new java.util.ArrayList<>();
a.add(4);
a.add(7);
int first = a.get(0);
```

```cpp
#include <vector>
std::vector<int> a{4};
a.push_back(7);
int first = a[0];
```

### 動態陣列：尾端操作、刪除與複製

Backtracking 用尾端新增／刪除；刪除中間元素通常需 O(n) 位移。Java remove(1) 是刪索引，remove(Integer.valueOf(1)) 才是刪值。三者的複製都是淺複製；巢狀可變元素仍需另外複製。

```python
path = [1, 2, 3]
last = path[-1]
path.pop()
del path[0]
copy = path.copy()
path.append(9)
size = len(path)
```

```java
java.util.List<Integer> path = new java.util.ArrayList<>(java.util.Arrays.asList(1, 2, 3));
int last = path.get(path.size() - 1);
path.remove(path.size() - 1);
path.remove(0);
java.util.List<Integer> copy = new java.util.ArrayList<>(path);
path.add(9);
int size = path.size();
```

```cpp
#include <vector>
std::vector<int> path{1, 2, 3};
int last = path.back();
path.pop_back();
path.erase(path.begin());
std::vector<int> copy = path;
path.push_back(9);
std::size_t size = path.size();
```
