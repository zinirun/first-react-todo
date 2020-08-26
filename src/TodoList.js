import React from 'react';

function Todo({ todo, onRemove, onToggle }) {
  const { id, title, isImportant } = todo;
  return (
    <div
      className="todo-wrapper"
      style={{
        background: isImportant ? '#FFE8EE' : '#ececff',
      }}
    >
      <span
        className="todo-title"
        style={{
          color: isImportant ? 'crimson' : '#171760',
        }}
      >
        {title}
      </span>
      <button className="important-bt" onClick={() => onToggle(id)}>
        중요
      </button>
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
