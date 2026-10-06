import { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

const STORAGE_KEY = "my_react_todos";

export default function App() {
  // Load saved todos once on first render. Older saved items that
  // were created before ids existed get an id here so keys stay stable.
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return [];
      return JSON.parse(saved).map((todo) => ({
        ...todo,
        id: todo.id ?? crypto.randomUUID(),
      }));
    } catch {
      return [];
    }
  });

  // Save to localStorage whenever the todos array changes.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    setTodos([...todos, { id: crypto.randomUUID(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const clearAll = () => {
    setTodos([]);
  };

  const remainingCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div>
      <div className="app-header">
        <h1>To Do List</h1>
        <div className="underline"></div>
      </div>

      <div className="todo-container" role="main">
        <AddTodo onAdd={addTodo} />

        <div className="stats-bar">
          <span id="todo-stats" aria-live="polite">
            {remainingCount} {remainingCount === 1 ? "item" : "items"} remaining
          </span>
        </div>

        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />

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
