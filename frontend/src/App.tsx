import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState<string>("");

  return (
    <div>
      <h1>Todo List</h1>
      <input type="text" value={task} onChange={e => setTask(e.target.value)} placeholder="Add a new task" />
      <button>Add</button>
    </div>
  );
}

export default App;
