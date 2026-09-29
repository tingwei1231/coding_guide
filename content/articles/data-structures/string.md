## 定義

字串是字元序列，但「字元」可能指位元組、Unicode code point 或使用者看到的字素。Python str 不可變，Java String 不可變；C++ std::string 是可變的位元組序列。

## 圖解

![String 字串 的結構示意：a (0)、b (1)、b (2)、a (3)](/diagrams/string.svg)

若找不重複子字串，abba 在讀到第二個 b 時需先移除 a、b，才能得到合法 window ba；不能把子字串與可跳字的子序列混用。

## 複雜度

| 操作 | 成本 | 前提與說明 |
|---|---|---|
| 已知位置存取 | 通常 O(1) | 依語言的索引單位 |
| 長度 k 的子字串複製 | O(k) 時間與空間 | 不把 view 當成複製 |
| 比較兩字串 | 最差 O(min(n,m)) | 逐個比較直到差異或結尾 |
| 重複建立遞增長字串 | 可能 O(n²) | 每次都複製既有前綴 |
| 儲存內容 | O(n) | 以儲存單位數計 |

## 適用情境

文字比對、字元頻率與連續子字串。先確認大小寫、字元集、是否只處理 ASCII，再選頻率陣列或 HashMap。

## 常見誤區

Java char 是 UTF-16 code unit，C++ char 不是完整 Unicode 字元。不同語言的 s.length 不一定等於使用者看到的字數。組合文字可用 Python join、Java StringBuilder，避免大量不可變拼接。

## 自我檢查與下一步

試著用自己的話回答：「這個結構保證哪些操作便宜？我是否把搜尋位置、複製或擴容的成本漏算了？」

前往[相關教材](/templates/sliding-window)，或回到[資料結構索引](/data-structures)。
