# React To Do List

An interactive Todo List application built to practice state management, event handling, and conditional rendering in React.

## Features

* Add new list items
* Validate input
* Mark as completed
* Delete individual list items
* Clear all completed list items
* Clear all list items at once (Reset slate)
* Display the number of remaining list items
* Remember list items using localStorage
* Responsive layout
* Keyboard accessible
* Screen reader-friendly
* Visible keyboard focus

## Core React Concepts

### State Management & Immutability (`useState`)

State represents the single source of truth for your data. When state updates, React handles updating the screen automatically.

* `task`: Tracks user input letter-by-letter as they type.
* `todos`: An array holding all active tasks. Starts as a clean, blank array `[]` unless data exists in local storage.

### State Object Paradigm Shift

Instead of a simple string array, individual items are structured as complex JavaScript **Objects**. This allows us to track multiple attributes (like content text and completion status) simultaneously:

```javascript
{ text: 'Learn React', completed: false }
```

### Spread Operator (`...`)

React enforces **immutability**—you must never modify the existing state directly (e.g., no `todos.push()`). Instead, we use the **Spread Operator** (`[...todos, newWrappedData]`) to create clean, fresh copies that trigger React's rendering system.

### Declarative UI & Dynamic Rendering (`.map()`)

Instead of writing step-by-step instructions to create `<li>` tags, we use the JavaScript `.map()` function. You describe a template for a single list item, and React loops through your `todos` state array to build the entire list dynamically.

### Derived State (No New State Needed!)

Instead of creating a new `count` state variable that you constantly have to sync, we calculate counts directly from the existing `todos` array using `.filter()` and `.length`. React recalculates this instantly every single time the `todos` array changes.

### Conditional Rendering (`&&`)

We use JavaScript's logical `&&` operator directly inside our layout to hide or show entire blocks of HTML based on our state.

* Example: `{todos.some(todo => todo.completed) && <Button />}` means the "Clear Completed" button is completely hidden from the screen if there are no completed items to clear.

---

## Code Breakdown

### Add Function

```javascript
const addTask = () => {
  if (task.trim() !== '') {
    // Save new task as an object with a default completed status of false
    setTodos([...todos, { text: task, completed: false }]); 
    setTask(''); // Wipe the text box clean
  }
};
```

### Side Effects & Synchronization (`useEffect`)

We use the `useEffect` hook to synchronize our React state with data outside the app environment (the browser's local memory stash).

* **The Dependency Array `[todos]`**: Tells React to stand guard and execute the sync block *only* when the task list changes.
* **Stringification**: Because browser storage only stores raw text strings, we use `JSON.stringify()` to flatten our data when saving, and `JSON.parse()` to reconstruct it when loading.

```javascript
// Automatically saves tasks to the browser disk whenever they change
useEffect(() => {
  localStorage.setItem('my_react_todos', JSON.stringify(todos));
}, [todos]);
```

### State-Driven Element Styling

Rather than running manual selector operations to manipulate class names, the user interface reads the current attributes of the object directly to settle styling choices inline:

```jsx
<span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
  {todo.text}
</span>
```

### Dynamic Task Counter

We calculate the remaining uncompleted items dynamically and use a ternary operator to keep the grammar correct.

```javascript
const remainingCount = todos.filter(todo => !todo.completed).length;

// Used in UI:
<span>
  {remainingCount} {remainingCount === 1 ? 'item' : 'items'} remaining
</span>
```

### Keyboard Event Listeners (`onKeyDown`)

Instead of making users manually move their mouse and click the "Add Task" button, we listen directly to the input field for keyboard activity. If the user presses the physical `Enter` key, we programmatically fire the same `addTask()` function.

```javascript
const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    addTask(); // Triggers the exact same logic as clicking the button
  }
};
```

### Delete Function

```javascript
const deleteTask = (indexToDelete) => {
  // .filter() creates a new array, leaving out the item that matches the clicked index
  const updatedTodos = todos.filter((_, index) => index !== indexToDelete);
  setTodos(updatedTodos);
};
```

### Clear Completed Function

To clear completed items, we filter our state array to retain only the items that have a `completed` status of `false`.

```javascript
const clearCompleted = () => {
  const activeTodos = todos.filter(todo => !todo.completed);
  setTodos(activeTodos);
};
```

### "Clear All" Feature

To completely wipe out the list regardless of completion status, we bypass item checks and pass a brand-new, completely empty array to our state updater function.

```javascript
const clearAll = () => {
  setTodos([]); // Overwrites the list with a fresh, empty container
};
```

### Accessibility & Assistive Tech Rules (a11y)

Writing semantic tags isn't enough when application interfaces shift elements on screen dynamically. We handle screen reader context explicitly:
* **`aria-label`**: Conveys real context dynamically back to headsets (e.g., announcing exactly which unique task name a specific loop button is trying to `Delete`).
* **`aria-live="polite"`**: Stands guard over our numeric summary tally, triggering immediate vocal announcements to screen reader users whenever item state mutations rewrite the numeric text node counts.

## Tech Stack

* React
* JSX
* JavaScript
* Browser Web Storage API
* CSS3

[**Run the To Do List App**](https://queenrania.github.io/to-do-list-react/)
