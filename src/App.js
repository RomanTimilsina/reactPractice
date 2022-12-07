import TodoList from './TodoList'
import {useState, useRef, useEffect} from "react"
import { v4 as uuidV4 } from "uuid"

const LOCAL_STORAGE_KEY = 'todoApp'

function App() {
  
  const [todos, setTodos] = useState([])
  const todoRef = useRef()

 /* useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todoApp.todos'))
    setTodos(storedTodos)
  },[])


  useEffect(() => {
    localStorage.setItem('todoApp.todos', JSON.stringify(todos))
  },[todos])
*/

useEffect(() => {
  const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  if (storedTodos) setTodos(storedTodos)
  console.log(storedTodos)
}, [])

useEffect(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  console.log((todos))
}, [todos])
  

  
  function handleAddTodo(e) {
    const name = todoRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidV4(), name: name, completed: false}]
    })
    todoRef.current.value = null
  }

  function handleClearTodo(e) {
   const newTodo = todos.filter(todo => !todo.completed)
   setTodos(newTodo)
  }

  function toggleTodo(id){
    const newTodo = [...todos]
    let todo =  newTodo.find(todo => todo.id === id)
    todo.completed = !todo.completed
    setTodos(newTodo)

  }

  return (
    <>
      <TodoList todos = {todos} toggleTodo = {toggleTodo} />
      <input ref={todoRef} type="text" />
      <button onClick = {handleAddTodo}>Add Todo</button>
      <button onClick = {handleClearTodo}>Clear Complete</button>
      <div>{(todos.filter(todo => !todo.completed).length)}</div>
    </>
  );
}

export default App;
