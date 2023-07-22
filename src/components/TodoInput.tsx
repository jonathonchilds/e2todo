// I used a basic Math.random() function, but I would probably like to use a more robust library like uuid to generate unique IDs for each todo item.

"use client";

import React, { useState } from "react";
import { TodoItem } from "../types/todoTypes";
import { TodoContext } from "../app/Provider";

const ToDoInput = () => {
  const [inputValue, setInputValue] = useState("");
  const { addTodo } = React.useContext(TodoContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue) return;
    const newTodo: TodoItem = {
      id: Math.floor(Math.random() * 10000),
      body: inputValue,
      isCompleted: false,
      created_at: new Date().toISOString(),
    };
    addTodo(newTodo);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo_form">
      <div className="gray_circle_btn"></div>
      <input
        type="text"
        className="todo_input"
        placeholder="Create a new todo..."
        value={inputValue}
        onChange={handleChange}
      />
    </form>
  );
};
export default ToDoInput;
