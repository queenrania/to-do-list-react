import TodoItem from "./TodoItem";

export default function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return (
      <div className="empty-message" role="status">
        No todos yet. Add one above!
      </div>
    );
  }

  return (
    <ul id="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
