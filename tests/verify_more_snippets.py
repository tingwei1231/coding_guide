"""Compile and execute the remaining pattern examples against independent small-case oracles."""
import bisect
import itertools
import json
from pathlib import Path
import random
import subprocess

ROOT = Path(__file__).resolve().parents[1]
rng = random.Random(20260929)
descriptors = [
    ('binary-search','lower-bound','lower_bound','lowerBound','normal'),
    ('binary-search','exact-match','binary_search','binarySearch','normal'),
    ('binary-search','boundaries','search_range','searchRange','normal'),
    ('binary-search','rotated-array','search_rotated','searchRotated','normal'),
    ('binary-search','answer-space','min_eating_speed','minEatingSpeed','normal'),
    ('two-pointers','sorted-pair','two_sum_sorted','twoSumSorted','normal'),
    ('two-pointers','opposite-ends','max_area','maxArea','normal'),
    ('two-pointers','fast-slow','has_cycle','hasCycle','linked'),
    ('two-pointers','three-sum','three_sum','threeSum','normal'),
    ('two-pointers','in-place','move_zeroes','moveZeroes','inplace'),
    ('bfs-dfs','bfs','bfs','bfs','graph'),
    ('bfs-dfs','dfs','dfs','dfs','graph'),
    ('backtracking','subsets','subsets','subsets','normal'),
    ('dp','top-down','rob_top_down','robTopDown','normal'),
    ('dp','bottom-up','rob_bottom_up','robBottomUp','normal'),
]
cases = {d[1]: [] for d in descriptors}
def add(name, args, expected): cases[name].append((args, expected))
for _ in range(45):
    nums = sorted(rng.randrange(-8,9) for _ in range(rng.randrange(11)))
    target = rng.randrange(-10,11)
    add('lower-bound',[nums,target],bisect.bisect_left(nums,target))
    indices = [i for i,v in enumerate(nums) if v == target]
    add('boundaries',[nums,target],[indices[0],indices[-1]] if indices else [-1,-1])
    unique = sorted(set(nums))
    add('exact-match',[unique,target],unique.index(target) if target in unique else -1)
    pivot = rng.randrange(len(unique)) if unique else 0
    rotated = unique[pivot:]+unique[:pivot]
    add('rotated-array',[rotated,target],rotated.index(target) if target in rotated else -1)
    piles = [rng.randrange(1,25) for _ in range(rng.randrange(1,8))]
    hours = rng.randrange(len(piles),len(piles)*25+1)
    speed = next(s for s in range(1,max(piles)+1) if sum((p+s-1)//s for p in piles)<=hours)
    add('answer-space',[piles,hours],speed)
    pair = next(([i+1,j+1] for i,j in itertools.combinations(range(len(unique)),2) if unique[i]+unique[j]==target),[])
    add('sorted-pair',[unique,target],pair)
    heights = [rng.randrange(10) for _ in range(rng.randrange(10))]
    area = max([(j-i)*min(heights[i],heights[j]) for i,j in itertools.combinations(range(len(heights)),2)] or [0])
    add('opposite-ends',[heights],area)
    n = rng.randrange(10); pos = rng.randrange(-1,n) if n else -1
    add('fast-slow',[n,pos],pos >= 0)
    shuffled = nums[:]; rng.shuffle(shuffled)
    triples = sorted(set(tuple(sorted(c)) for c in itertools.combinations(shuffled,3) if sum(c)==0))
    add('three-sum',[shuffled],[list(c) for c in triples])
    zeroes = [rng.randrange(-2,3) for _ in range(rng.randrange(10))]
    add('in-place',[zeroes],[v for v in zeroes if v]+[0]*zeroes.count(0))
    values = rng.sample(range(-10,10),rng.randrange(8))
    expected = sorted([list(c) for size in range(len(values)+1) for c in itertools.combinations(values,size)])
    add('subsets',[values],expected)
    amounts = [rng.randrange(12) for _ in range(rng.randrange(10))]
    best = max((sum(amounts[i] for i in range(len(amounts)) if mask>>i&1) for mask in range(1<<len(amounts)) if not (mask & (mask<<1))),default=0)
    add('top-down',[amounts],best); add('bottom-up',[amounts],best)

# Cycles, self edges, disconnected components, repeated edges and nonzero starts.
graphs = [([[1,2],[2],[0,3],[3]],0), ([[],[2],[1]],1), ([[0,0]],0), ([[1,1],[2],[],[]],0)]
for graph,start in graphs:
    order=[]; pending=[start]; seen={start}
    while pending:
        node=pending.pop(0); order.append(node)
        for neighbor in graph[node]:
            if neighbor not in seen: seen.add(neighbor); pending.append(neighbor)
    add('bfs',[graph,start],order)
    order=[]; pending=[start]; seen=set()
    while pending:
        node=pending.pop()
        if node in seen: continue
        seen.add(node); order.append(node); pending.extend(reversed(graph[node]))
    add('dfs',[graph,start],order)
add('boundaries',[[2147483647,2147483647],2147483647],[0,1])
add('answer-space',[[1000000000]*4,4],1000000000)
add('answer-space',[[1000000000]*4,1000000000],4)
add('sorted-pair',[[-2147483648,0,2147483647],-1],[1,3])
add('opposite-ends',[[2147483647,0,2147483647]],4294967294)
add('three-sum',[[-2147483648,1,2147483647]],[[-2147483648,1,2147483647]])
add('top-down',[[2147483647,0,2147483647]],4294967294)
add('bottom-up',[[2147483647,0,2147483647]],4294967294)

work=ROOT/'.snippet-check/more'; work.mkdir(parents=True,exist_ok=True)
java_parts=[]; cpp_parts=[]; expected=[]; result_kinds=[]
java_calls=[]; cpp_calls=[]
def literal(value, lang, matrix=False):
    if isinstance(value,list):
        if matrix:
            if lang=='java': return 'toGraph(new int[][]{'+','.join('{'+','.join(map(str,row))+'}' for row in value)+'})'
            return 'std::vector<std::vector<int>>{'+','.join('{'+','.join(map(str,row))+'}' for row in value)+'}'
        return ('new int[]{' if lang=='java' else 'std::vector<int>{')+','.join(map(str,value))+'}'
    return str(value)
for index,(pattern_id,lesson_id,py_name,native_name,kind) in enumerate(descriptors):
    pattern=json.loads((ROOT/f'content/patterns/{pattern_id}.json').read_text(encoding='utf-8'))
    lesson=next(l for l in pattern['standard_templates']+pattern['variations'] if l['id']==lesson_id)
    scope={}; exec('\n'.join(lesson['code']['python']['lines']),scope)
    java_parts.append('\n'.join(lesson['code']['java']['lines']).replace('class Solution','class Snippet'+str(index)))
    cpp_parts.append('\n'.join(lesson['code']['cpp']['lines']))
    for args,answer in cases[lesson_id]:
        copied=json.loads(json.dumps(args))
        if kind=='linked':
            n,pos=args; nodes=[scope['ListNode'](1) for _ in range(n)]
            for i in range(n-1): nodes[i].next=nodes[i+1]
            if n and pos>=0: nodes[-1].next=nodes[pos]
            actual=scope[py_name](nodes[0] if n else None)
            j=f'{{ ListNode[] nodes=new ListNode[{n}]; for(int i=0;i<nodes.length;i++) nodes[i]=new ListNode(1); for(int i=0;i+1<nodes.length;i++) nodes[i].next=nodes[i+1];'
            c=f'{{ std::vector<ListNode> nodes; for(int i=0;i<{n};++i) nodes.emplace_back(1); for(int i=0;i+1<{n};++i) nodes[i].next=&nodes[i+1];'
            if n and pos>=0: j+=f'nodes[{n-1}].next=nodes[{pos}];'; c+=f'nodes[{n-1}].next=&nodes[{pos}];'
            j+=f'System.out.println(new Snippet{index}().{native_name}('+('nodes[0]' if n else 'null')+'));}'
            c+='dump('+native_name+'('+('&nodes[0]' if n else 'nullptr')+')); std::cout << "\\n";}'
        elif kind=='inplace':
            scope[py_name](*copied); actual=copied[0]
            j=f'{{ int[] nums={literal(args[0],"java")}; new Snippet{index}().{native_name}(nums); System.out.println(java.util.Arrays.toString(nums)); }}'
            c=f'{{ auto nums={literal(args[0],"cpp")}; {native_name}(nums); dump(nums); std::cout << "\\n"; }}'
        else:
            actual=scope[py_name](*copied)
            jargs=','.join(literal(v,'java',kind=='graph' and i==0) for i,v in enumerate(args))
            cargs=','.join(literal(v,'cpp',kind=='graph' and i==0) for i,v in enumerate(args))
            jcall=f'new Snippet{index}().{native_name}({jargs})'
            if lesson_id in ['boundaries','sorted-pair']: jcall='java.util.Arrays.toString('+jcall+')'
            j='System.out.println('+jcall+');'
            c='dump('+native_name+'('+cargs+')); std::cout << "\\n";'
        if lesson_id in ['subsets','three-sum']: actual=sorted(actual)
        assert actual==answer,(lesson_id,args,actual,answer)
        java_calls.append(j); cpp_calls.append(c); expected.append(answer); result_kinds.append(lesson_id)

java='\n'.join(java_parts)
imports=[line for line in java.splitlines() if line.startswith('import ')]
java='\n'.join(imports)+'\n'+'\n'.join(line for line in java.splitlines() if not line.startswith('import '))
java+='\nclass VerifyMore { static java.util.List<java.util.List<Integer>> toGraph(int[][] input) { java.util.List<java.util.List<Integer>> result=new java.util.ArrayList<>(); for(int[] row:input) { java.util.List<Integer> list=new java.util.ArrayList<>(); for(int v:row) list.add(v); result.add(list); } return result; } public static void main(String[] args) {\n'+'\n'.join(java_calls)+'\n}}'
cpp='#include <iostream>\n#include <vector>\ntemplate<class T> void dump(const T& value) { std::cout << value; }\ntemplate<class T> void dump(const std::vector<T>& values) { std::cout << "["; for(size_t i=0;i<values.size();++i) { if(i) std::cout << ","; dump(values[i]); } std::cout << "]"; }\n'+'\n'.join(cpp_parts)+'\nint main() { std::cout << std::boolalpha;\n'+'\n'.join(cpp_calls)+'\n}'
(work/'VerifyMore.java').write_text(java,encoding='utf-8'); (work/'verify.cpp').write_text(cpp,encoding='utf-8')
def run(command):
    result=subprocess.run(command,cwd=work,capture_output=True,text=True,encoding='utf-8',errors='replace',timeout=120)
    if result.returncode: raise RuntimeError(f'{command}: {result.stderr}')
    return result.stdout
run(['javac','--release','8','-encoding','UTF-8','VerifyMore.java'])
run(['g++','-std=c++17','-O0','verify.cpp','-o','verify.exe'])
for language,command in [('Java',['java','-cp',str(work),'VerifyMore']),('C++',[str(work/'verify.exe')])]:
    output=[json.loads(line) for line in run(command).splitlines()]
    assert len(output)==len(expected),(language,len(output),len(expected))
    for actual,answer,kind in zip(output,expected,result_kinds):
        if kind in ['subsets','three-sum']: actual=sorted(actual)
        assert actual==answer,(language,kind,actual,answer)
print(f'Additional 15 lessons: Python, Java, C++ each passed {len(expected)} oracle cases.')
