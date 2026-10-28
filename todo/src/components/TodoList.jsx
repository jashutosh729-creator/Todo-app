import { useTodos } from '../context/TodoContext.jsx'
import Todoitem from './Todoitem.jsx'

export default function TodoList() {
  const { visibleTasks, search, filter } = useTodos()

  return (
    <div className="task-list" aria-live="polite">
      {visibleTasks.map((task) => <Todoitem task={task} key={task.id} />)}
      {visibleTasks.length === 0 && <div className="empty-state"><div className="empty-icon">{search ? '⌕' : filter === 'Completed' ? '✳' : '✓'}</div><h3>{search ? 'No matching tasks' : filter === 'Completed' ? 'Nothing completed yet' : filter === 'Active' ? 'You’re all caught up' : 'A fresh start'}</h3><p>{search ? 'Try another search term.' : filter === 'Completed' ? 'Finished tasks will find their way here.' : filter === 'Active' ? 'Enjoy the breathing room. Add a task anytime.' : 'Add a task above and make today count.'}</p></div>}
    </div>
  )
}
