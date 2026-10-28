import Navbar from './components/Navbar.jsx'
import TodoForm from './components/TodoForm.jsx'
import TodoList from './components/TodoList.jsx'
import { TodoProvider, useTodos } from './context/TodoContext.jsx'

function TaskSummary() {
  const { tasks, remaining, completed } = useTodos()

  return (
    <section className="stats-grid" aria-label="Task summary">
      <article className="stat-card stat-total"><span className="stat-icon"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="6" y="4" width="13" height="16" rx="2"/><path d="M9 8h7M9 12h7m-7 4h4M9 3v3m7-3v3"/></svg></span><span className="stat-info"><span>Total tasks</span><strong>{tasks.length.toString().padStart(2, '0')}</strong></span><span className="stat-footnote">ON YOUR LIST</span></article>
      <article className="stat-card stat-active"><span className="stat-icon"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 3h6m-5 0v7l-4.5 7.3A2.4 2.4 0 0 0 7.6 21h8.8a2.4 2.4 0 0 0 2.1-3.7L14 10V3m-5 12h6"/></svg></span><span className="stat-info"><span>Remaining</span><strong>{remaining.toString().padStart(2, '0')}</strong></span><span className="stat-footnote">READY WHEN YOU ARE</span></article>
      <article className="stat-card stat-done"><span className="stat-icon"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m8 12.5 2.5 2.5 5.5-6M20 12a8 8 0 1 1-4.1-7M17 3v5h5"/></svg></span><span className="stat-info"><span>Completed</span><strong>{completed.toString().padStart(2, '0')}</strong></span><span className="stat-footnote">LOOK AT YOU GO</span></article>
    </section>
  )
}

function TaskToolbar() {
  const { tasks, remaining, completed, filter, setFilter, search, setSearch } = useTodos()
  return (
    <div className="toolbar">
      <div className="filter-tabs" role="tablist" aria-label="Filter tasks">{['All', 'Active', 'Completed'].map((item) => <button key={item} type="button" role="tab" aria-selected={filter === item} className={`filter-tab ${filter === item ? 'selected' : ''}`} onClick={() => setFilter(item)}>{item}<span className="tab-count">{item === 'All' ? tasks.length : item === 'Active' ? remaining : completed}</span></button>)}</div>
      <label className="search-box"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4 4"/></svg><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a task" aria-label="Search tasks" />{search && <button type="button" onClick={() => setSearch('')} aria-label="Clear search">×</button>}</label>
    </div>
  )
}

function PanelFooter() {
  const { tasks, visibleTasks, completed, clearCompleted } = useTodos()
  return <footer className="panel-footer"><span>Showing <strong>{visibleTasks.length}</strong> of <strong>{tasks.length}</strong> {tasks.length === 1 ? 'task' : 'tasks'}</span>{completed > 0 && <button className="clear-button" type="button" onClick={clearCompleted}>Clear completed <span>↗</span></button>}<span className="footer-note">MADE FOR YOUR NEXT SMALL WIN <span>✳</span></span></footer>
}

function TaskPanel() {
  const { notice } = useTodos()
  return (
    <section className="tasks-panel" aria-labelledby="tasks-heading">
      <div className="panel-heading"><div><div className="section-kicker">YOUR FOCUS LIST</div><h2 id="tasks-heading">My tasks <span className="heading-spark">✳</span></h2><p>Keep track of what matters today.</p></div><span className="focus-chip"><span /> ONE THING AT A TIME</span></div>
      <TodoForm />
      <TaskToolbar />
      {notice && <div className="notice" role="status"><span>✳</span>{notice}</div>}
      <TodoList />
      <PanelFooter />
    </section>
  )
}

function TaskMateApp() {
  const today = new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())
  return <div className="app-shell"><Navbar /><main className="main-content" id="home"><section className="hero"><div className="hero-copy"><span className="eyebrow"><span className="eyebrow-line" /> A LITTLE PROGRESS GOES A LONG WAY</span><h1>Make today<br className="mobile-break" /> <span>count.</span></h1><p>Small steps every day lead to big results.</p></div><div className="date-card"><span className="date-icon">◷</span><span><small>YOUR DAY, AT A GLANCE</small><strong>{today}</strong></span></div></section><TaskSummary /><TaskPanel /><footer className="page-footer"><span>TaskMate <span className="footer-divider">/</span> Your day, made a little lighter.</span><span>ONE SMALL STEP AT A TIME <span>↗</span></span></footer></main></div>
}

function App() {
  return <TodoProvider><TaskMateApp /></TodoProvider>
}

export default App
