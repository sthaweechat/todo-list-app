import { useState } from "react";
import "./App.css";

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

function App() {
  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = () => {
    if (task.trim()) {
      const newTodo: Todo = { id: Date.now(), task, completed: false };
      setTodos([...todos, newTodo]);
      setTask("");
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input type="text" value={task} onChange={e => setTask(e.target.value)} placeholder="Add a new task" />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo.id)} />
            <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.task}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
