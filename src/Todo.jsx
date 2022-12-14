import React from 'react'

export default function Todo({todo, toggleTodo}) {

  function handleToggle() {
      toggleTodo(todo.id)
  }

  return (
    <div>
      <label>
      <input type="checkbox" checked={todo.completed} onChange = {handleToggle} />
      {todo.name}
      </label>
    </div>
  )
}
