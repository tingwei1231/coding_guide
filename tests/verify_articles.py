"""Check new island implementations and the eight language-operation snippets."""
import json
from pathlib import Path
import random
import re
import subprocess

ROOT=Path(__file__).resolve().parents[1]
def code_blocks(path):
    body=(ROOT/path).read_text(encoding='utf-8')
    return {lang: re.findall(r'```'+lang+r'\n([\s\S]*?)\n```',body) for lang in ['python','java','cpp']}
code=code_blocks('content/articles/guided-learning/bfs-dfs.md')
scope={}; exec(code['python'][0],scope)
rng=random.Random(200)
cases=[[],[[]],[list('10'),list('01')],[list('111'),list('111')]]
for _ in range(60):
    rows,cols=rng.randrange(7),rng.randrange(7)
    cases.append([[rng.choice('01') for _ in range(cols)] for _ in range(rows)])
def oracle(grid):
    rows=len(grid); cols=len(grid[0]) if rows else 0
    parent=list(range(rows*cols))
    def find(i):
        while parent[i]!=i: i=parent[i]
        return i
    for r in range(rows):
        for c in range(cols):
            if grid[r][c]!='1': continue
            for nr,nc in [(r+1,c),(r,c+1)]:
                if nr<rows and nc<cols and grid[nr][nc]=='1': parent[find(r*cols+c)]=find(nr*cols+nc)
    return len({find(r*cols+c) for r in range(rows) for c in range(cols) if grid[r][c]=='1'})
answers=[]
java_calls=[]; cpp_calls=[]
for grid in cases:
    original=[row[:] for row in grid]; expected=oracle(grid)
    assert scope['num_islands'](grid)==expected
    assert grid==original
    answers.append(expected)
    rows=[json.dumps(''.join(row)) for row in grid]
    j='new char[][]{'+','.join(row+'.toCharArray()' for row in rows)+'}'
    c='toGrid(std::vector<std::string>{'+','.join(rows)+'})'
    java_calls.append('System.out.println(new Solution().numIslands('+j+'));')
    cpp_calls.append('std::cout << numIslands('+c+') << "\\n";')
work=ROOT/'.snippet-check/articles';work.mkdir(parents=True,exist_ok=True)
java=code['java'][0]+'\nclass VerifyArticles { public static void main(String[] args) {\n'+'\n'.join(java_calls)+'\n}}'
cpp='#include <string>\n#include <iostream>\n'+code['cpp'][0]+'\nstd::vector<std::vector<char>> toGrid(const std::vector<std::string>& rows) { std::vector<std::vector<char>> result; for(const auto& row:rows) result.emplace_back(row.begin(),row.end()); return result; }\nint main(){\n'+'\n'.join(cpp_calls)+'\n}'
def run(command):
    p=subprocess.run(command,cwd=work,capture_output=True,text=True,encoding='utf-8',errors='replace',timeout=90)
    if p.returncode: raise RuntimeError(p.stderr)
    return p.stdout
def native_check(java,cpp,expected):
    (work/'VerifyArticles.java').write_text(java,encoding='utf-8')
    (work/'verify.cpp').write_text(cpp,encoding='utf-8')
    run(['javac','--release','8','-encoding','UTF-8','VerifyArticles.java'])
    run(['g++','-std=c++17','verify.cpp','-o','verify.exe'])
    for command in [['java','-cp',str(work),'VerifyArticles'],[str(work/'verify.exe')]]:
        assert [json.loads(line) for line in run(command).splitlines()]==expected
native_check(java,cpp,answers)

examples=code_blocks('content/articles/languages.md')
checks=[('first',4),('first','a'),('counts',{'A':1}),('exists',True),('value',7),('value',4),('smallest',2),('a',[2,7])]
for source,(name,expected) in zip(examples['python'],checks):
    scope={};exec(source,scope);assert scope[name]==expected
# Print scalar checks from Java/C++ without relying on collection string formats.
java_expr=['first', '(int) first', "counts.get('A')", 'exists ? 1 : 0', 'value', 'value', 'smallest', 'a[0] * 10 + a[1]']
cpp_expr=['first', '(int) first', "counts['A']", 'exists ? 1 : 0', 'value', 'value', 'smallest', 'a[0] * 10 + a[1]']
java='class VerifyArticles { public static void main(String[] args) {\n'+'\n'.join('{'+s+'\nSystem.out.println('+e+');}' for s,e in zip(examples['java'],java_expr))+'\n}}'
headers=set();bodies=[]
for s,e in zip(examples['cpp'],cpp_expr):
    headers.update(line for line in s.splitlines() if line.startswith('#include'))
    bodies.append('{\n'+'\n'.join(line for line in s.splitlines() if not line.startswith('#include'))+'\nstd::cout << ('+e+') << "\\n";\n}')
cpp='#include <iostream>\n'+'\n'.join(sorted(headers))+'\nint main(){\n'+'\n'.join(bodies)+'\n}'
native_check(java,cpp,[4,97,1,1,7,4,2,27])
print(f'Islands: {len(cases)} cases per language; eight language examples verified in Python, Java, C++.')
