import { useState } from "react";

export default function AddTodo({ onAdd }) {
  const [task, setTask] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.trim() === "") {
      setError("Please enter a to do before adding.");
      return;
    }

    onAdd(task.trim());
    setTask("");
    setError("");
  };

  const handleChange = (e) => {
    setTask(e.target.value);
    if (error) setError("");
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="input-group">
        <input
          type="text"
          value={task}
          onChange={handleChange}
          placeholder="Enter a new to do..."
          id="todo-input"
          aria-label="New to-do item text input"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "todo-error" : undefined}
        />
        <button type="submit" className="add-btn" aria-controls="todo-list">
          Add To Do
        </button>
      </div>

      {error && (
        <p id="todo-error" className="error-message" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
