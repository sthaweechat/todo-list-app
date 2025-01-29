import React, { useState } from "react";
import "./index.css";

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editTodo, setEditTodo] = useState<{ id: number | null; task: string }>({
    id: null,
    task: "",
  });

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

  const startEditTodo = (id: number, task: string) => {
    setEditTodo({ id, task }); // เก็บข้อมูลเดิมก่อนทำการแก้ไข
    setTask(task); // ตั้งค่า task เป็นค่านี้ด้วยเช่นกัน
  };

  const saveEditTodo = () => {
    if (editTodo.id !== null) {
      setTodos(todos.map(todo => (todo.id === editTodo.id ? { ...todo, task: editTodo.task } : todo)));
      setEditTodo({ id: null, task: "" });
      setTask(""); // รีเซ็ตค่า task ให้เป็นค่าว่างเมื่อบันทึกเสร็จ
    }
  };

  const cancelEditTodo = () => {
    setEditTodo({ id: null, task: "" });
    setTask(""); // รีเซ็ตค่า task ให้เป็นค่าว่างเมื่อยกเลิก
  };

  return (
    <div className="flex justify-around center flex-col sm:flex-row sm:justify-center sm:items-center h-screen bg-gray-100">
      {/* คอลัมน์ตรงกลาง (6 ส่วน สำหรับหน้าจอใหญ่, 12 ส่วน สำหรับมือถือ) */}
      <div className="col-span-6 sm:col-span-12 flex flex-col justify-center items-center p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">Todo List</h1>
        <div className="flex mb-4 w-full">
          <input
            type="text"
            onChange={e => setTask(e.target.value)}
            placeholder="Add a new task"
            className="flex-grow p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
          />
          <button onClick={addTodo} className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition">
            Add
          </button>
        </div>
        <ul className="w-full">
          {todos.map(todo => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-2 border-b border-gray-200 last:border-none"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  className="mr-2"
                />
                {editTodo.id === todo.id ? (
                  <input
                    type="text"
                    value={editTodo.task} // ให้แสดงค่าที่อยู่ใน editTodo
                    onChange={e => setEditTodo({ ...editTodo, task: e.target.value })}
                    className="flex p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <span
                    style={{ textDecoration: todo.completed ? "line-through" : "none" }}
                    className="text-lg text-gray-800"
                  >
                    {todo.task}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {editTodo.id === todo.id ? (
                  <>
                    <button
                      onClick={saveEditTodo}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditTodo}
                      className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEditTodo(todo.id, todo.task)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
