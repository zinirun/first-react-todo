import React, { useRef, useState } from 'react';
import CreateTodo from './CreateTodo';
import TodoList from './TodoList';
import './App.css';

function App() {
  const appTitle = '할 일';
  const [inputs, setInputs] = useState({
    title: '',
  });

  const { title } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const [todos, setTodos] = useState([
    {
      id: 1,
      title: '리액트 혼내주기',
      isImportant: false,
    },
  ]);

  const nextId = useRef(2);
  const onCreate = () => {
    if (title.length < 1) {
      return;
    } else {
      const newTodo = {
        id: nextId.current,
        title,
      };
      setTodos([...todos, newTodo]);
      setInputs({
        title: '',
      });
      nextId.current += 1;
    }
  };

  const onRemove = (id) => {
    console.dir(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const onToggle = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, isImportant: !todo.isImportant } : todo)),
    );
  };

  return (
    <div className="app-wrapper">
      <div className="todo-logo">
        {appTitle}
        <span style={{ color: 'crimson' }}>.</span>
      </div>
      <CreateTodo title={title} onCreate={onCreate} onChange={onChange} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </div>
  );
}

export default App;
