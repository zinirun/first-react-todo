import React from 'react';

function Todo({ todo, onRemove, onToggle }) {
  const { id, title, isImportant } = todo;
  return (
    <div className="todo-wrapper">
      <span
        className="todo-title"
        onClick={() => onToggle(id)}
        style={{
          color: isImportant ? 'crimson' : 'black',
          cursor: 'pointer',
        }}
      >
        {title}
      </span>
      <button className="remove-bt" onClick={() => onRemove(id)}>
        삭제
      </button>
    </div>
  );
}

function TodoList({ todos, onRemove, onToggle }) {
  return (
    <div className="todolist-wrapper">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} onRemove={onRemove} onToggle={onToggle} />
      ))}
    </div>
  );
}

export default TodoList;
