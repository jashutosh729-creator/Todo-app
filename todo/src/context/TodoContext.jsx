import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const TodoContext = createContext(null)
const STORAGE_KEY = 'taskmate-tasks-v1'
const initialTasks = [
  { id: 'welcome-plan', text: 'Plan your priorities for today', completed: false, createdAt: Date.now() - 3000 },
  { id: 'welcome-water', text: 'Take a moment to recharge', completed: true, createdAt: Date.now() - 2000 },
]

function readTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === null ? initialTasks : JSON.parse(saved)
  } catch {
    return initialTasks
  }
}

export function TodoProvider({ children }) {
  const [tasks, setTasks] = useState(readTasks)
  const [draft, setDraft] = useState('')
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)) }, [tasks])

  const completed = tasks.filter((task) => task.completed).length
  const remaining = tasks.length - completed
  const visibleTasks = useMemo(() => tasks.filter((task) => {
    const matchesFilter = filter === 'All' || (filter === 'Active' ? !task.completed : task.completed)
    return matchesFilter && task.text.toLowerCase().includes(search.trim().toLowerCase())
  }), [tasks, filter, search])

  function addTask(event) {
    event.preventDefault()
    const text = draft.trim()
    if (!text) { setNotice('Write a task first, then add it to your list.'); return }
    setTasks((current) => [{ id: crypto.randomUUID(), text, completed: false, createdAt: Date.now() }, ...current])
    setDraft('')
    setNotice('Task added to your day.')
    window.setTimeout(() => setNotice(''), 2400)
  }

  function toggleTask(id) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, completed: !task.completed } : task))
  }

  function deleteTask(id) { setTasks((current) => current.filter((task) => task.id !== id)) }

  function clearCompleted() {
    setTasks((current) => current.filter((task) => !task.completed))
    setNotice('Completed tasks cleared.')
    window.setTimeout(() => setNotice(''), 2400)
  }

  const value = {
    tasks, draft, setDraft, filter, setFilter, search, setSearch, notice,
    completed, remaining, visibleTasks, addTask, toggleTask, deleteTask, clearCompleted,
  }

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

export function useTodos() {
  const context = useContext(TodoContext)
  if (!context) throw new Error('useTodos must be used inside TodoProvider')
  return context
}
