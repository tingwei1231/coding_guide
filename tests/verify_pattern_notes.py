"""Execute the published Pattern notes in Python, Java and C++17."""
from pathlib import Path
import re
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
article = (ROOT / 'content/articles/templates/pattern-notes.md').read_text(encoding='utf-8')
snippets = {lang: re.findall(r'```' + lang + r'\n(.*?)\n```', article, re.S)
            for lang in ['python', 'java', 'cpp']}
assert all(len(code) == 15 for code in snippets.values())

class Node:
    def __init__(self, val, next=None, left=None, right=None):
        self.val, self.next, self.left, self.right = val, next, left, right

ns = {}
for code in snippets['python']:
    exec(code, ns)
nums = [3, 2, 2, 3]
assert ns['removeElement'](nums, 3) == 2 and nums[:2] == [2, 2]
assert ns['removeElement']([], 3) == 0
assert ns['buildPrefix']([2, -3, 4]) == [0, 2, -1, 3]
assert ns['buildPrefix']([]) == [0]
for s, expected in [('([])', True), ('([)]', False), (']', False), ('(', False), ('', True)]:
    assert ns['isValid'](s) == expected
assert ns['nextSmaller']([3, 3, 1, 2]) == [2, 2, -1, -1]
assert ns['nextSmaller']([]) == []
head = Node(1)
assert not ns['hasCycle'](head)
head.next = head
assert ns['hasCycle'](head) and not ns['hasCycle'](None)
tree = Node(2, left=Node(1), right=Node(3))
assert ns['maxDepth'](tree) == 2 and ns['maxDepth'](None) == 0
assert ns['levelOrder'](tree) == [[2], [1, 3]] and ns['levelOrder'](None) == []
assert ns['isValidBST'](tree) and ns['isValidBST'](None)
tree.right.left = Node(0)
assert not ns['isValidBST'](tree)
tree.right.left = Node(2)
assert not ns['isValidBST'](tree)
grid = [[1, 1], [1, 0]]
assert ns['floodFill'](grid, 0, 0, 2) == [[2, 2], [2, 0]]
assert ns['floodFill'](grid, 0, 0, 2) == grid
assert ns['floodFill']([], 0, 0, 2) == []
trie = ns['Trie']()
trie.insert('apple')
assert trie.search('apple') and not trie.search('app') and trie.startsWith('app')
assert not trie.startsWith('bad')
trie.insert('')
assert trie.search('')
assert ns['canJump']([2, 3, 1, 1, 4]) and not ns['canJump']([3, 2, 1, 0, 4])
assert ns['canJump']([0]) and not ns['canJump']([])
assert ns['longestCommonSubsequence']('abcde', 'ace') == 3
assert ns['longestCommonSubsequence']('', 'a') == 0
assert ns['maxSubArray']([-2, -3, -1]) == -1
assert ns['maxSubArray']([-2, 1, -3, 4, -1, 2, 1, -5, 4]) == 6
try:
    ns['maxSubArray']([])
except ValueError:
    pass
else:
    raise AssertionError('empty Kadane input')
assert ns['singleNumber']([2, 2, -1]) == -1
assert ns['hammingWeight'](0) == 0 and ns['hammingWeight'](-1) == 32
assert ns['neighbors'](2, 2, 0, 0) == [[1, 0], [0, 1]]
assert ns['neighbors'](0, 0, 0, 0) == []

cpp_checks = r'''
int main() {
    vector<int> nums{3,2,2,3};
    assert(removeElement(nums,3)==2 && nums[0]==2 && nums[1]==2);
    vector<int> empty;
    assert(removeElement(empty,3)==0);
    assert(buildPrefix({2,-3,4})==vector<long long>({0,2,-1,3}));
    assert(buildPrefix({})==vector<long long>({0}));
    assert(isValid("([])") && !isValid("([)]") && !isValid("]") && isValid(""));
    assert(nextSmaller({3,3,1,2})==vector<int>({2,2,-1,-1}));
    assert(nextSmaller({}).empty());
    ListNode head{1,nullptr};
    assert(!hasCycle(&head) && !hasCycle(nullptr));
    head.next=&head; assert(hasCycle(&head));
    TreeNode left{1,nullptr,nullptr}, right{3,nullptr,nullptr}, root{2,&left,&right};
    assert(maxDepth(&root)==2 && maxDepth(nullptr)==0);
    assert(levelOrder(&root)==vector<vector<int>>({{2},{1,3}}));
    assert(levelOrder(nullptr).empty());
    assert(isValidBST(&root) && isValidBST(nullptr));
    TreeNode wrong{0,nullptr,nullptr}; right.left=&wrong; assert(!isValidBST(&root));
    wrong.val=2; assert(!isValidBST(&root));
    vector<vector<int>> grid{{1,1},{1,0}}, noGrid;
    assert(floodFill(grid,0,0,2)==vector<vector<int>>({{2,2},{2,0}}));
    assert(floodFill(grid,0,0,2)==grid && floodFill(noGrid,0,0,2).empty());
    Trie trie; trie.insert("apple");
    assert(trie.search("apple") && !trie.search("app") && trie.startsWith("app"));
    assert(!trie.startsWith("bad")); trie.insert(""); assert(trie.search(""));
    assert(canJump({2,3,1,1,4}) && !canJump({3,2,1,0,4}) && canJump({0}) && !canJump({}));
    assert(longestCommonSubsequence("abcde","ace")==3);
    assert(longestCommonSubsequence("","a")==0);
    assert(maxSubArray({-2,-3,-1})==-1);
    assert(maxSubArray({-2,1,-3,4,-1,2,1,-5,4})==6);
    bool threw=false; try { maxSubArray({}); } catch (const invalid_argument&) { threw=true; }
    assert(threw && singleNumber({2,2,-1})==-1);
    assert(hammingWeight(0)==0 && hammingWeight(UINT32_MAX)==32);
    assert((neighbors(2,2,0,0)==vector<pair<int,int>>({{1,0},{0,1}})));
    assert(neighbors(0,0,0,0).empty());
}
'''

java_checks = r'''
public class VerifyNotes {
    static void check(boolean value) { if (!value) throw new AssertionError(); }
    public static void main(String[] args) {
        int[] nums={3,2,2,3};
        check(new Notes0().removeElement(nums,3)==2 && nums[0]==2 && nums[1]==2);
        check(new Notes0().removeElement(new int[0],3)==0);
        check(Arrays.equals(new Notes1().buildPrefix(new int[]{2,-3,4}),new long[]{0,2,-1,3}));
        check(Arrays.equals(new Notes1().buildPrefix(new int[0]),new long[]{0}));
        Notes2 stack=new Notes2();
        check(stack.isValid("([])") && !stack.isValid("([)]") && !stack.isValid("]") && stack.isValid(""));
        check(Arrays.equals(new Notes3().nextSmaller(new int[]{3,3,1,2}),new int[]{2,2,-1,-1}));
        check(new Notes3().nextSmaller(new int[0]).length==0);
        ListNode head=new ListNode(1);
        check(!new Notes4().hasCycle(head) && !new Notes4().hasCycle(null));
        head.next=head; check(new Notes4().hasCycle(head));
        TreeNode root=new TreeNode(2); root.left=new TreeNode(1); root.right=new TreeNode(3);
        check(new Notes5().maxDepth(root)==2 && new Notes5().maxDepth(null)==0);
        check(new Notes6().levelOrder(root).equals(Arrays.asList(Arrays.asList(2),Arrays.asList(1,3))));
        check(new Notes6().levelOrder(null).isEmpty());
        check(new Notes7().isValidBST(root) && new Notes7().isValidBST(null));
        root.right.left=new TreeNode(0); check(!new Notes7().isValidBST(root));
        root.right.left.val=2; check(!new Notes7().isValidBST(root));
        int[][] grid={{1,1},{1,0}};
        check(Arrays.deepEquals(new Notes8().floodFill(grid,0,0,2),new int[][]{{2,2},{2,0}}));
        check(Arrays.deepEquals(new Notes8().floodFill(grid,0,0,2),grid));
        check(new Notes8().floodFill(new int[0][],0,0,2).length==0);
        Trie trie=new Trie(); trie.insert("apple");
        check(trie.search("apple") && !trie.search("app") && trie.startsWith("app"));
        check(!trie.startsWith("bad")); trie.insert(""); check(trie.search(""));
        Notes10 greedy=new Notes10();
        check(greedy.canJump(new int[]{2,3,1,1,4}) && !greedy.canJump(new int[]{3,2,1,0,4}));
        check(greedy.canJump(new int[]{0}) && !greedy.canJump(new int[0]));
        check(new Notes11().longestCommonSubsequence("abcde","ace")==3);
        check(new Notes11().longestCommonSubsequence("","a")==0);
        check(new Notes12().maxSubArray(new int[]{-2,-3,-1})==-1);
        check(new Notes12().maxSubArray(new int[]{-2,1,-3,4,-1,2,1,-5,4})==6);
        boolean threw=false;
        try { new Notes12().maxSubArray(new int[0]); } catch (IllegalArgumentException e) { threw=true; }
        check(threw && new Notes13().singleNumber(new int[]{2,2,-1})==-1);
        check(new Notes13().hammingWeight(0)==0 && new Notes13().hammingWeight(-1)==32);
        List<int[]> neighbors=new Notes14().neighbors(2,2,0,0);
        check(neighbors.size()==2 && Arrays.equals(neighbors.get(0),new int[]{1,0}) && Arrays.equals(neighbors.get(1),new int[]{0,1}));
        check(new Notes14().neighbors(0,0,0,0).isEmpty());
    }
}
'''

with tempfile.TemporaryDirectory(prefix='pattern-notes-') as directory:
    work = Path(directory)
    headers = ['algorithm', 'vector', 'string', 'stack', 'queue', 'unordered_map',
               'memory', 'functional', 'climits', 'cstdint', 'stdexcept', 'cassert']
    cpp = ''.join(f'#include <{header}>\n' for header in headers) + 'using namespace std;\n'
    cpp += 'struct ListNode { int val; ListNode* next; };\n'
    cpp += 'struct TreeNode { int val; TreeNode* left; TreeNode* right; };\n'
    cpp += '\n'.join(snippets['cpp']) + cpp_checks
    (work / 'notes.cpp').write_text(cpp, encoding='utf-8')
    subprocess.run(['g++', '-std=c++17', str(work / 'notes.cpp'), '-o', str(work / 'notes.exe')], check=True)
    subprocess.run([str(work / 'notes.exe')], check=True)
    java = 'import java.util.*;\n'
    java += 'class ListNode { int val; ListNode next; ListNode(int v) { val=v; } }\n'
    java += 'class TreeNode { int val; TreeNode left,right; TreeNode(int v) { val=v; } }\n'
    java += '\n'.join(code.replace('class Solution', f'class Notes{i}') for i, code in enumerate(snippets['java']))
    (work / 'VerifyNotes.java').write_text(java + java_checks, encoding='utf-8')
    subprocess.run(['javac', '--release', '8', str(work / 'VerifyNotes.java')], check=True)
    subprocess.run(['java', '-cp', str(work), 'VerifyNotes'], check=True)
print('All 15 template groups passed normal and boundary cases in Python, Java and C++17.')
