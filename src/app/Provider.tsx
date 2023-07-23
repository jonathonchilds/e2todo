"use client";

import React, { createContext, useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";

import { supabase } from "../../lib/initSupabase"

import { TodoItem, TodoFilter, TodoContextType } from "@/types/todoTypes";
import { Database } from "@/types/supabase";

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  setTodos: () => {},
  todoFilter: "all",
  setTodoFilter: () => {},
  addTodo: (todo: TodoItem): void => {},
  removeTodo: (id: number): void => {},
  updateTodo: (updatedTodo: TodoItem): void => {},
});

export const Provider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [todoFilter, setTodoFilter] = useState<TodoFilter>("all");

  const addTodo = async (todo: TodoItem) => {
    const existingTodo = todos.find((t) => t.id === todo.id);
    if (existingTodo) {
      return;
    }
    try {
      const { error } = await supabase.from("tasks").insert([todo]).single();
      if (error) {
        console.error(error);
        return;
      }
      setTodos((prevTodos) => [...prevTodos, todo]);
    } catch (error) {
      console.error(error);
    }
  };

  const removeTodo = async (id: number) => {
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", id);
      if (error) {
        console.error(error);
      }
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodo = async (updatedTodo: TodoItem) => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .update(updatedTodo)
        .eq("id", updatedTodo.id)
        .select();
      if (data) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) => {
            if (todo.id === updatedTodo.id) {
              return updatedTodo;
            }
            return todo;
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data, error } = await supabase.from("tasks").select("*");
        if (error) {
          console.error(error);
          return;
        }
        const filteredTodos = data.map((todo) => {
          if (todo.body === null) {
            return { ...todo, body: "" };
          }
          if (todo.isCompleted === null) {
            return { ...todo, isCompleted: false };
          }
          if (todo.created_at === null) {
            return { ...todo, created_at: "" };
          }
          return todo;
        });
        setTodos(filteredTodos as TodoItem[]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        addTodo,
        removeTodo,
        updateTodo,
        todoFilter,
        setTodoFilter,
      }}
    >
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </TodoContext.Provider>
  );
};
