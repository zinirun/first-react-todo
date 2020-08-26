import React from 'react';

function CreateTodo({ title, onCreate, onChange }) {
  return (
    <div className="create-wrapper">
      <input
        className="create-title"
        name="title"
        placeholder="할 일"
        value={title}
        onChange={onChange}
        autoComplete="off"
      />
      <button className="create-bt" onClick={onCreate}>
        등록
      </button>
    </div>
  );
}

export default CreateTodo;
