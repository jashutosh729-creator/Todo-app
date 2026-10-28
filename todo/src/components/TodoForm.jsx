import { useTodos } from '../context/TodoContext.jsx'

export default function TodoForm() {
  const { draft, setDraft, addTask } = useTodos()

  return (
    <form className="add-form" onSubmit={addTask}>
      <label className="input-wrap"><span className="input-plus">＋</span><input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="What would you like to get done?" aria-label="New task" maxLength={140} /><span className="shortcut-hint">↵</span></label>
      <button className="add-button" type="submit"><span>＋</span> Add task</button>
    </form>
  )
}
