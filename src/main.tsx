import { StrictMode, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { Article } from './Article';
import { articleFor, pages, patternIndex, titleFor, type Page } from './content';
import './styles.css';
import { PatternPage } from './PatternPage';
import { PatternSearch } from './PatternSearch';
import { QuizPage } from './QuizPage';

const sections = [
  { name: '建立基礎', ids: ['roadmap', 'data-structures', 'big-o', 'languages'] },
  { name: '辨識與練習', ids: ['templates', 'guided-learning', 'quiz'] },
  { name: '走向面試', ids: ['mock-interview', 'career-prep'] },
];
function Cards({ items }: { items: Page[] }) {
  return <div className="cards">{items.map((p, i) => <Link className="card" to={p.route} key={p.id}>
    <span className="card-number">{String(i + 1).padStart(2, '0')}</span>
    <h3>{titleFor(p)}</h3><p>{p.sections.slice(0, 3).join(' · ')}</p><span className="card-arrow" aria-hidden="true">↗</span>
  </Link>)}</div>;
}
function ContentPage({ page }: { page: Page }) {
  const article = articleFor(page);
  const children = pages.filter(p => p.route.startsWith(`${page.route}/`) && p.route !== page.route);
  const pattern = page.route.startsWith('/templates/') ? patternIndex[page.route.split('/')[2]] : undefined;
  return <>
    <header className="page-heading"><p className="eyebrow">CODING GUIDE / LEARN</p><h1>{titleFor(page)}</h1>
      <p className="lead">{page.id === 'home' ? '從讀懂題目開始，辨識模式、理解模板，再帶著思路練習。' : '把概念拆開理解，為下一次練習建立清楚的思路。'}</p>
    </header>
    {(page.id === 'templates' || pattern) && <PatternSearch />}
    {article && <Article key={page.id} text={article} parallel={page.id === 'languages'} />}
    {page.id === 'home' && <><div className="hero-path"><span>01 理解基礎</span><b aria-hidden="true">→</b><span>02 辨識模式</span><b aria-hidden="true">→</b><span>03 動手練習</span></div>
      <div className="section-heading"><h2>找到你的起點</h2><span>循序前進，自主探索</span></div>
      <Cards items={['roadmap', 'data-structures', 'templates', 'guided-learning'].map(id => pages.find(p => p.id === id)!)} /></>}
    {children.length > 0 && page.id !== 'templates' && <Cards items={children} />}
    {pattern && <PatternPage key={pattern.id} pattern={pattern} />}
    {page.id === 'quiz' && <QuizPage />}
    {!article && !pattern && page.id !== 'templates' && <section className="outline"><span className="badge">教材準備中</span><h2>這個章節將帶你理解</h2>
      <ul>{page.sections.map(s => <li key={s}>{s}</li>)}</ul><p>完整內容尚未開放，可以先閱讀 <Link to="/templates/sliding-window">Sliding Window 範例</Link>。</p></section>}
  </>;
}
function App() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const main = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const current = pages.find(p => p.route === location.pathname);
  useEffect(() => {
    document.title = `${current ? titleFor(current) : '找不到頁面'}｜Coding Guide`;
    setMenuOpen(false);
    main.current?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [location.pathname, current]);
  return <><a className="skip" href="#main">跳到主要內容</a>
    <header className="topbar"><Link className="brand" to="/"><span className="brand-icon" aria-hidden="true">cg.</span><span>Coding Guide<small>刷題前的引導手冊</small></span></Link>
      <span className="top-note">理解，比記住答案更重要。</span>
      <button ref={menuButton} className="menu-toggle" aria-controls="site-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '關閉選單' : '開啟選單'}</button>
    </header>
    <div className="workspace"><aside id="site-navigation" className={menuOpen ? 'sidebar open' : 'sidebar'} onKeyDown={e => { if (e.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); } }}>
      <nav aria-label="主要導覽"><NavLink to="/" end>手冊首頁</NavLink>{sections.map(group => <section key={group.name}><h2>{group.name}</h2>{group.ids.map(id => {
        const p = pages.find(p => p.id === id)!; return <NavLink key={id} to={p.route}>{titleFor(p)}</NavLink>;
      })}</section>)}</nav><div className="sidebar-note">先建立思路，<br />再前往 LeetCode 練習。</div></aside>
      <main id="main" ref={main} tabIndex={-1}><div className="breadcrumb"><Link to="/">手冊</Link><span aria-hidden="true"> / </span>{current && current.id !== 'home' ? titleFor(current) : current ? '開始學習' : '404'}</div>
        <Routes>{pages.map(p => <Route key={p.id} path={p.route} element={<ContentPage page={p} />} />)}
          <Route path="*" element={<section className="not-found"><p className="eyebrow">404 / PAGE NOT FOUND</p><h1>這一頁還不在手冊裡。</h1><p>請確認網址，或回到首頁選擇章節。</p><Link className="button-link" to="/">回到手冊首頁 →</Link></section>} />
        </Routes><footer>CODING GUIDE <span>一步一步，把解題思路練清楚。</span></footer>
      </main></div></>;
}
createRoot(document.getElementById('root')!).render(<StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>);
