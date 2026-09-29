"""Offline authoring check: execute the actual JSON snippets, never user input."""
import json
from pathlib import Path
import random
import subprocess
from collections import Counter

ROOT = Path(__file__).resolve().parents[1]
pattern = json.loads((ROOT / 'content/patterns/sliding-window.json').read_text(encoding='utf-8'))
lessons = pattern['standard_templates'] + pattern['variations']
names = [('longest_within_budget', 'longestWithinBudget'), ('find_max_average', 'findMaxAverage'),
         ('length_of_longest_substring', 'lengthOfLongestSubstring'), ('min_sub_array_len', 'minSubArrayLen'),
         ('min_window', 'minWindow'), ('max_sliding_window', 'maxSlidingWindow')]
rng = random.Random(239)
cases = [[] for _ in lessons]
for _ in range(60):
    nums = [rng.randrange(6) for _ in range(rng.randrange(8))]
    budget = rng.randrange(12)
    ranges = [nums[i:j] for i in range(len(nums)) for j in range(i+1, len(nums)+1)]
    cases[0].append(([nums, budget], max([len(x) for x in ranges if sum(x) <= budget] or [0])))
    nums = [rng.randrange(-9, 10) for _ in range(rng.randrange(1, 9))]
    k = rng.randrange(1, len(nums)+1)
    windows = [nums[i:i+k] for i in range(len(nums)-k+1)]
    cases[1].append(([nums, k], max(map(sum, windows))/k))
    cases[5].append(([nums, k], [max(w) for w in windows]))
    s = ''.join(rng.choice('abca') for _ in range(rng.randrange(9)))
    substrings = [s[i:j] for i in range(len(s)) for j in range(i+1, len(s)+1)]
    cases[2].append(([s], max([len(x) for x in substrings if len(set(x)) == len(x)] or [0])))
    nums = [rng.randrange(1, 7) for _ in range(rng.randrange(9))]
    target = rng.randrange(1, 18)
    ranges = [nums[i:j] for i in range(len(nums)) for j in range(i+1, len(nums)+1)]
    cases[3].append(([target, nums], min([len(x) for x in ranges if sum(x) >= target] or [0])))
    t = ''.join(rng.choice('abc') for _ in range(rng.randrange(5)))
    required = Counter(t)
    valid = [x for x in substrings if not (required - Counter(x))]
    cases[4].append(([s, t], min(valid, key=len) if t and valid else ''))
# Boundary and known counterexample-adjacent cases within the stated domains.
cases[1] += [([[-5,-3,-8],1],-3), ([[7],1],7)]
cases[2] += [(['abba'],2), ([''],0)]
cases[3] += [([7,[2,3,1,2,4,3]],2), ([99,[1,2]],0)]
cases[4] += [(['ADOBECODEBANC','ABC'],'BANC'), (['AAAB','AAB'],'AAB'), (['a','aa'],'')]
cases[5] += [([[1,3,-1,-3,5,3,6,7],3],[3,3,5,5,6,7]), ([[2,2,2],2],[2,2])]

expected = []
for i, lesson in enumerate(lessons):
    scope = {}
    exec('\n'.join(lesson['code']['python']['lines']), scope)
    for args, answer in cases[i]:
        actual = scope[names[i][0]](*args)
        assert actual == answer, (lesson['id'], args, actual, answer)
        expected.append(answer)

def literal(value, lang):
    if isinstance(value, list):
        return ('new int[]{' if lang == 'java' else 'std::vector<int>{') + ','.join(map(str,value)) + '}'
    return json.dumps(value)

work = ROOT / '.snippet-check'
work.mkdir(parents=True, exist_ok=True)
java = '\n'.join('\n'.join(l['code']['java']['lines']).replace('class Solution', 'class Snippet'+str(i)) for i,l in enumerate(lessons))
# Java imports must precede every class declaration.
imports = [line for line in java.splitlines() if line.startswith('import ')]
java = '\n'.join(imports) + '\n' + '\n'.join(line for line in java.splitlines() if not line.startswith('import '))
java += '\nclass Verify { public static void main(String[] args) {\n'
cpp = '#include <iostream>\n#include <iomanip>\n' + '\n'.join('\n'.join(l['code']['cpp']['lines']) for l in lessons)
cpp += '\nint main() { std::cout << std::setprecision(17);\n'
for i in range(len(lessons)):
    for args, _ in cases[i]:
        jcall = 'new Snippet'+str(i)+'().'+names[i][1]+'('+','.join(literal(v,'java') for v in args)+')'
        ccall = names[i][1]+'('+','.join(literal(v,'cpp') for v in args)+')'
        if i == 5:
            java += 'System.out.println(java.util.Arrays.toString('+jcall+'));\n'
            cpp += '{ auto values='+ccall+'; std::cout << "["; for(size_t i=0;i<values.size();++i) { if(i) std::cout << ","; std::cout << values[i]; } std::cout << "]\\n"; }\n'
        elif i == 4:
            java += 'System.out.println("\\\"" + '+jcall+' + "\\\"");\n'
            cpp += 'std::cout << std::quoted('+ccall+') << "\\n";\n'
        else:
            java += 'System.out.println('+jcall+');\n'
            cpp += 'std::cout << '+ccall+' << "\\n";\n'
java += '}}\n'
cpp += '}\n'
(work/'Verify.java').write_text(java,encoding='utf-8')
(work/'verify.cpp').write_text(cpp,encoding='utf-8')
def run(command):
    return subprocess.run(command,cwd=work,check=True,capture_output=True,text=True,encoding='utf-8',timeout=90).stdout
run(['javac','--release','8','-encoding','UTF-8','Verify.java'])
run(['g++','-std=c++17','-O0','verify.cpp','-o','verify.exe'])
for language, command in [('Java',['java','-cp',str(work),'Verify']),('C++',[str(work/'verify.exe')])]:
    output = [json.loads(line) for line in run(command).splitlines()]
    assert len(output) == len(expected), (language,len(output),len(expected))
    for actual, answer in zip(output,expected):
        if isinstance(answer,float): assert abs(actual-answer) < 1e-9, (language,actual,answer)
        else: assert actual == answer, (language,actual,answer)
print(f'Python, Java, C++: {len(expected)} cases each, all passed against brute-force references.')
