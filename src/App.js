import React, { useRef, useState } from 'react';
import CreateTodo from './CreateTodo';
import TodoList from './TodoList';
import './App.css';

function App() {
  const [inputs, setInputs] = useState({
    title: '',
  });

  const { title } = inputs;

  const [todos, setTodos] = useState([
    {
      id: 1,
      title: '리액트 마스터하기',
      isImportant: false,
    },
  ]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const nextId = useRef(2);
  const onCreate = () => {
    const todo = {
      id: nextId,
      title,
    };
    setTodos([...todos, todo]);
    setInputs({
      title: '',
    });
    nextId.current += 1;
  };

  const onRemove = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const onToggle = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, isImportant: !todo.isImportant } : todo)),
    );
  };

  return (
    <div className="app-wrapper">
      <CreateTodo title={title} onCreate={onCreate} onChange={onChange} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </div>
  );
}

export default App;
