export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={todo.completed ? "completed-item" : ""}>
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
          onChange={() => onToggle(todo.id)}
          style={{
            flexShrink: 0,
            width: "18px",
            height: "18px",
            margin: 0,
            cursor: "pointer",
          }}
          id={`checkbox-${todo.id}`}
          aria-label={`Mark "${todo.text}" as complete`}
        />

        <span
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
            color: todo.completed ? "#9ca3af" : "#1f2937",
            wordBreak: "break-word",
            paddingLeft: "4px",
          }}
        >
          {todo.text}
        </span>
      </div>

      <button
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete "${todo.text}"`}
      >
        Delete
      </button>
    </li>
  );
}
