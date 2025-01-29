import { useState } from "react";
import "./App.css";

interface Todo {
  id: number;
  task: string;
}

function App() {
  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = () => {
    if (task.trim()) {
      const newTodo: Todo = { id: Date.now(), task };
      setTodos([...todos, newTodo]);
      setTask("");
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input type="text" value={task} onChange={e => setTask(e.target.value)} placeholder="Add a new task" />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.task}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
