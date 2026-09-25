import React, { useState, useEffect } from "react";

export default function TodoApp() {
  // 1. Load data from localStorage when the app first opens.
  // If nothing is saved, fall back to our default array.
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("my_react_todos");
    return savedTodos
      ? JSON.parse(savedTodos)
      : [];
  });

  const [task, setTask] = useState("");

  // 2. The useEffect Hook: Automatically updates localStorage
  // every single time the 'todos' array changes.
  useEffect(() => {
    localStorage.setItem("my_react_todos", JSON.stringify(todos));
  }, [todos]); // <--- This dependency array tells React to watch 'todos'

  const addTask = () => {
    if (task.trim() !== "") {
      setTodos([...todos, { text: task, completed: false }]);
      setTask("");
    }
  };

  const toggleComplete = (indexToToggle) => {
    const updatedTodos = todos.map((todo, index) => {
      if (index === indexToToggle) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const deleteTask = (indexToDelete) => {
    const updatedTodos = todos.filter((_, index) => index !== indexToDelete);
    setTodos(updatedTodos);
  };

  const clearCompleted = () => {
    const activeTodos = todos.filter((todo) => !todo.completed);
    setTodos(activeTodos);
  };

  const clearAll = () => {
    setTodos([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const remainingCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div>
      <div className="app-header">
        <h1>To Do List</h1>
        <div className="underline"></div>
      </div>

      <div className="todo-container">
        <div className="input-group">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a new to do..."
          />
          <button className="add-btn" onClick={addTask}>
            Add
          </button>
        </div>

        <div className="stats-bar">
          <span>
            {remainingCount} {remainingCount === 1 ? "item" : "items"} remaining
          </span>
        </div>

        {/* Dynamic Task List or Empty Message */}
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed ? "completed-item" : ""}>
            {/* 💡 Explicitly add width: 100% and overflow: hidden to the wrapper row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                width: "100%",
                minWidth: 0,
                overflow: "hidden",
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(index)}
                style={{
                  flexShrink: 0,
                  width: "18px",
                  height: "18px",
                  margin: 0,
                  cursor: "pointer",
                }}
              />

              {/* 💡 Simplify the span style to let text wrap cleanly without shifting the checkbox */}
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "#9ca3af" : "#1f2937",
                  wordBreak: "break-word",
                  paddingLeft:
                    "4px" /* Adds a tiny bit of breathing room from the checkbox */,
                }}
              >
                {todo.text}
              </span>
            </div>
            <button className="delete-btn" onClick={() => deleteTask(index)}>
              Delete
            </button>
          </li>
        ))}

        {/* Bottom Actions Area */}
        {todos.length > 0 && (
          <div className="bottom-actions">
            {todos.some((todo) => todo.completed) && (
              <button className="clear-btn" onClick={clearCompleted}>
                Clear Completed
              </button>
            )}

            {/* Ensure this class setup matches exactly */}
            <button className="clear-btn clear-all-btn" onClick={clearAll}>
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
