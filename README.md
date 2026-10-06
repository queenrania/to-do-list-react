# React To Do App

A to do list built with React and Vite. Add tasks, check them off, delete them, and come back later to find your list right where you left it.

## Features

- Add a to do with a form (press Enter or click "Add To Do")
- Validation message when you try to add an empty to do
- Mark to dos complete or incomplete with a checkbox, with strike-through styling on finished items
- Delete individual to dos
- "Clear Completed" and "Clear All" buttons
- Live count of items remaining
- Friendly empty state when there are no to dos
- To dos are saved to localStorage, so they persist between sessions
- Accessibility support: ARIA labels on inputs and buttons, a live region for the item count, and an alert role on the validation message

## Built With

- React (functional components and hooks: `useState`, `useEffect`)
- Vite
- CSS

## Project Structure

```
src/
  App.jsx              Owns the to do state, localStorage syncing, and handlers
  components/
    AddTodo.jsx        Form, input state, and validation message
    TodoList.jsx       Renders the list or the empty state
    TodoItem.jsx       A single to do with checkbox and delete button
```

## How It Works

- `App` holds the array of to dos. Each to do is an object with an `id`, `text`, and `completed` value.
- State updates always create new arrays and objects instead of changing the existing ones.
- `App` passes handlers down to the child components as props.
- `AddTodo` keeps its own input and error state, and sends the finished text up to `App` when the form is submitted.
- A `useEffect` watches the to dos array and saves it to localStorage every time it changes.
- List items use the to do `id` as the React key, so items stay stable when others are deleted.
