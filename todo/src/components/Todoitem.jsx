import { useTodos } from '../context/TodoContext.jsx'

export default function Todoitem({ task }) {
  const { toggleTask, deleteTask } = useTodos()

  return (
    <article className={`task-row ${task.completed ? 'is-complete' : ''}`}>
      <button className="check-button" type="button" onClick={() => toggleTask(task.id)} aria-label={task.completed ? `Mark ${task.text} active` : `Complete ${task.text}`} aria-pressed={task.completed}>{task.completed && <svg viewBox="0 0 16 16" fill="none"><path d="m3.5 8 3 3 6-6" /></svg>}</button>
      <div className="task-copy"><span className="task-text">{task.text}</span><span className="task-meta">{task.completed ? 'Finished' : 'On your list'} <span>·</span> {new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' }).format(task.createdAt)}</span></div>
      <span className={`task-status ${task.completed ? 'status-done' : 'status-active'}`}><span />{task.completed ? 'Done' : 'In progress'}</span>
      <button className="delete-button" type="button" onClick={() => deleteTask(task.id)} aria-label={`Delete ${task.text}`} title="Delete task"><svg viewBox="0 0 24 24" fill="none"><path d="M4 7h16m-10 4v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3" /></svg></button>
    </article>
  )
}
