"use client";

import React, { createContext, useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";

import { ITodoItem } from "@/types/todoitem";

type TodoContextType = {
  todos: ITodoItem[];
  addTodo: (todo: ITodoItem) => void;
  removeTodo: (id: number) => void;
  updateTodo: (updatedTodo: ITodoItem) => void;
};

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  addTodo: (todo: ITodoItem): void => {},
  removeTodo: (id: number): void => {},
  updateTodo: (updatedTodo: ITodoItem): void => {},
});

export const Provider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [todos, setTodos] = useState<ITodoItem[]>([]);

  const addTodo = async (todo: ITodoItem) => {
    const existingTodo = todos.find((t) => t.id === todo.id);
    if (existingTodo) {
      return;
    }
    const response = await fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    if (response.ok) {
      const newTodo = await response.json();
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    }
  };

  const removeTodo = async (id: number) => {
    const response = await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }
  };

  const updateTodo = async (updatedTodo: ITodoItem) => {
    const id = updatedTodo.id;
    const response = await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });
    if (response.ok) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.id === id) {
            return updatedTodo;
          }
          return todo;
        })
      );
    } else {
      console.error("Sorry, that todo could not be updated.");
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch("http://localhost:3001/tasks");
      const todo = await response.json();
      setTodos(todo);
    };
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider value={{ todos, addTodo, removeTodo, updateTodo }}>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </TodoContext.Provider>
  );
};
