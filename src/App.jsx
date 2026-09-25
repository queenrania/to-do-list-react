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
      {/* Background Title matching the Image */}
      <div className="app-header">
        <h1>To Do List</h1>
        <div className="underline"></div>
      </div>

      {/* Main Floating Card Container */}
      {/* 💡 Role="main" helps screen readers identify the core content zone instantly */}
      <div className="todo-container" role="main">
        
        {/* Input Field Form */}
        <div className="input-group">
          <input 
            type="text" 
            value={task} 
            onChange={(e) => setTask(e.target.value)} 
            onKeyDown={handleKeyDown} 
            placeholder="Enter a new to do..." 
            id="todo-input"
            aria-label="New to-do item text input" /* 💡 Tells screen readers exactly what this textbox does */
          />
          <button 
            className="add-btn" 
            onClick={addTask}
            aria-controls="todo-list" /* 💡 Informs assistive tech that clicking this alters the list below */
          >
            Add To Do
          </button>
        </div>

        {/* Dynamic Items Counter Row */}
        <div className="stats-bar">
          {/* 💡 Aria-live="polite" tells screen readers to read this out loud whenever the number changes */}
          <span id="todo-stats" aria-live="polite">
            {remainingCount} {remainingCount === 1 ? 'item' : 'items'} remaining
          </span>
        </div>

        {todos.length === 0 ? (
          <div className="empty-message" role="status">No todos yet. Add one above!</div>
        ) : (
          /* 💡 Added id so our add button knows which specific element it controls */
          <ul id="todo-list">
            {todos.map((todo, index) => (
              <li key={index} className={todo.completed ? 'completed-item' : ''}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', minWidth: 0, overflow: 'hidden' }}>
                  
                  <input 
                    type="checkbox" 
                    checked={todo.completed} 
                    onChange={() => toggleComplete(index)}
                    style={{ flexShrink: 0, width: '18px', height: '18px', margin: 0, cursor: 'pointer' }} 
                    id={`checkbox-${index}`}
                    aria-label={`Mark "${todo.text}" as complete`} /* 💡 Gives clear context instead of just reading "checkbox" */
                  />
                  
                  <span style={{ 
                    textDecoration: todo.completed ? 'line-through' : 'none', 
                    color: todo.completed ? '#9ca3af' : '#1f2937',
                    wordBreak: 'break-word',
                    paddingLeft: '4px'
                  }}>
                    {todo.text}
                  </span>
                </div>
                <button 
                  className="delete-btn" 
                  onClick={() => deleteTask(index)}
                  aria-label={`Delete "${todo.text}"`} /* 💡 Tells screen readers exactly which item is being dropped */
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Bottom Actions Area */}
        {todos.length > 0 && (
          <div className="bottom-actions">
            {todos.some((todo) => todo.completed) && (
              <button 
                className="clear-btn" 
                onClick={clearCompleted}
                aria-label="Clear all completed items from the list"
              >
                Clear Completed
              </button>
            )}

            <button 
              className="clear-btn clear-all-btn" 
              onClick={clearAll}
              aria-label="Wipe out all items and reset the list completely"
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
