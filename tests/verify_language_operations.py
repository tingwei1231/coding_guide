"""Execute the twelve added operation comparisons using the published code."""
from pathlib import Path
import re
import subprocess
import tempfile

root = Path(__file__).resolve().parents[1]
body = (root / 'content/articles/languages.md').read_text(encoding='utf-8')
code = {lang: re.findall(r'```' + lang + r'\n(.*?)\n```', body, re.S)[8:]
        for lang in ['python', 'java', 'cpp']}
assert all(len(blocks) == 12 for blocks in code.values())
python_checks = [
    'exists and size == 2 and empty and seen == set()',
    'value == 0 and exists and size == 1 and counts == {7: 3}',
    'total == 4',
    'last == 3 and copy == [2] and path == [2, 9] and size == 2',
    'front == 1 and back == 9 and list(dq) == [2, 7] and size == 2',
    'largest == 7 and removed == 7 and size == 2',
    'items == [[1, 4], [1, 2], [2, 1]]',
    'left == 1 and right == 3 and count == 2',
    'part == "bc" and position == 1 and missing and reversed_text == "dcba" and number == 123 and digits == "123"',
    'visited[0][0] and not visited[1][0] and graph == [[1], [], []]',
    'value == 2 and index == 0',
    'ceiling == 4 and values == [2, 7]',
]
java_checks = [
    'exists && size == 2 && empty && removed && !missing && seen.isEmpty()',
    'value == 0 && exists && size == 1 && counts.get(7) == 3 && !counts.containsKey(99)',
    'total == 4',
    'last == 3 && copy.equals(java.util.Arrays.asList(2)) && path.equals(java.util.Arrays.asList(2,9)) && size == 2',
    'front == 1 && back == 9 && size == 2 && dq.peekFirst() == 2 && dq.peekLast() == 7',
    'largest == 7 && removed == 7 && size == 2',
    'java.util.Arrays.deepEquals(items, new int[][]{{1,4},{1,2},{2,1}})',
    'left == 1 && right == 3 && count == 2',
    'part.equals("bc") && position == 1 && missing && reversedText.equals("dcba") && number == 123 && digits.equals("123")',
    'visited[0][0] && !visited[1][0] && graph.get(0).get(0) == 1 && graph.get(1).isEmpty()',
    'value == 2 && index == 0',
    'ceiling == 4 && values.size() == 2 && !values.contains(4)',
]
cpp_checks = [
    'exists && size == 2 && empty && removed == 1 && missing == 0 && inserted',
    'value == 0 && exists && size == 1 && counts.at(7) == 3 && counts.count(99) == 0',
    'total == 4',
    'last == 3 && copy == std::vector<int>({2}) && path == std::vector<int>({2,9}) && size == 2',
    'front == 1 && back == 9 && size == 2 && dq.front() == 2 && dq.back() == 7',
    'largest == 7 && removed == 7 && size == 2',
    'items == std::vector<std::vector<int>>({{1,4},{1,2},{2,1}})',
    'left == 1 && right == 3 && count == 2',
    'part == "bc" && position == 1 && missing && reversedText == "dcba" && number == 123 && digits == "123"',
    'visited[0][0] && !visited[1][0] && graph[0][0] == 1 && graph[1].empty()',
    'value == 2 && index == 0',
    'found && ceiling == 4 && values.size() == 2 && values.count(4) == 0',
]
for snippet, check in zip(code['python'], python_checks):
    scope = {}
    exec(snippet, scope)
    assert eval(check, scope), check

with tempfile.TemporaryDirectory(prefix='language-ops-') as directory:
    work = Path(directory)
    java = 'class VerifyOperations { public static void main(String[] args) {\n'
    java += '\n'.join('{\n' + snippet + '\nif (!(' + check + ')) throw new AssertionError();\n}'
                      for snippet, check in zip(code['java'], java_checks))
    java += '\n}}'
    (work / 'VerifyOperations.java').write_text(java, encoding='utf-8')
    subprocess.run(['javac', '--release', '8', '-encoding', 'UTF-8', str(work / 'VerifyOperations.java')], check=True)
    subprocess.run(['java', '-cp', str(work), 'VerifyOperations'], check=True)
    headers = {'#include <cassert>'}
    blocks = []
    for snippet, check in zip(code['cpp'], cpp_checks):
        lines = snippet.splitlines()
        headers.update(line for line in lines if line.startswith('#include'))
        statements = '\n'.join(line for line in lines if not line.startswith('#include'))
        blocks.append('{\n' + statements + '\nassert((' + check + '));\n}')
    cpp = '\n'.join(sorted(headers)) + '\nint main() {\n' + '\n'.join(blocks) + '\n}'
    (work / 'operations.cpp').write_text(cpp, encoding='utf-8')
    subprocess.run(['g++', '-std=c++17', str(work / 'operations.cpp'), '-o', str(work / 'operations.exe')], check=True)
    subprocess.run([str(work / 'operations.exe')], check=True)
print('All twelve added comparisons passed in Python, Java and C++17.')
