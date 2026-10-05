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

## 三語言常用操作

### 字串與拼接

Python str 與 Java String 不可變；C++ string 可變。下例建立 ab。索引單位不同：Python 以 code point，Java char 以 UTF-16 code unit，C++ string 以位元組；此處僅比較 ASCII。

```python
s = ''.join(['a', 'b'])
first = s[0]
```

```java
String s = new StringBuilder().append('a').append('b').toString();
char first = s.charAt(0);
```

```cpp
#include <string>
std::string s = "a";
s += 'b';
char first = s[0];
```

### 字串：擷取、搜尋、反轉與數值轉換

以下限 ASCII。Python／Java 擷取使用 [start,end)，C++ substr 第二參數是長度。搜尋失敗：Python／Java 為 −1，C++ 為 string::npos。數值轉換可能失敗或超出範圍；擷取與反轉通常需 O(k) 工作。

```python
text = "abcd"
part = text[1:3]
position = text.find("bc")
missing = text.find("z") == -1
reversed_text = text[::-1]
number = int("123")
digits = str(123)
```

```java
String text = "abcd";
String part = text.substring(1, 3);
int position = text.indexOf("bc");
boolean missing = text.indexOf("z") == -1;
String reversedText = new StringBuilder(text).reverse().toString();
int number = Integer.parseInt("123");
String digits = String.valueOf(123);
```

```cpp
#include <string>
#include <algorithm>
std::string text = "abcd";
std::string part = text.substr(1, 2);
std::size_t position = text.find("bc");
bool missing = text.find("z") == std::string::npos;
std::string reversedText = text;
std::reverse(reversedText.begin(), reversedText.end());
int number = std::stoi("123");
std::string digits = std::to_string(123);
```
