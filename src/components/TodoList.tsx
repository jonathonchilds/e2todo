"use client";

import React, { useContext, useState } from "react";
import TodoItem from "./TodoItem";
import { TodoContext } from "./Providers";
import { ITodoItem } from "../types/todoitem";
import useMediaQuery from "../hooks/useMediaQuery";

const ToDoList = () => {
  const { todos, removeTodo } = useContext(TodoContext);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const isMobile = useMediaQuery("(max-width: 375px)");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") {
      return !todo.isCompleted;
    } else if (filter === "completed") {
      return todo.isCompleted;
    }
    return true;
  });

  const numberOfTodosRemaining = (todos: ITodoItem[]): string => {
    const numberOfTodos = todos.filter((todo) => !todo.isCompleted).length;
    return numberOfTodos === 1
      ? `${numberOfTodos} item left`
      : `${numberOfTodos} items left`;
  };

  const handleShowAllTodos = () => {
    setFilter("all");
  };

  const handleShowActiveTodos = () => {
    setFilter("active");
  };

  const handleShowCompletedTodos = () => {
    setFilter("completed");
  };

  const handleClearCompletedTodos = () => {
    todos
      .filter((todo) => todo.isCompleted)
      .forEach((todo) => removeTodo(todo.id));
    setFilter("all");
  };

  return (
    <section>
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}

      {isMobile ? (
        <div>
          <section className="mobile_list_footer">
            <div>{numberOfTodosRemaining(todos)}</div>
            <button
              className="tableFooterBtn"
              onClick={handleClearCompletedTodos}
            >
              Clear Completed
            </button>
          </section>
          <section>
            <div className="mobile_list_detached_footer">
              <button
                className={`list_footer_btn ${
                  filter === "all" ? "list_footer_btn_active" : ""
                }`}
                onClick={handleShowAllTodos}
                aria-pressed={filter === "all" ? "true" : "false"}
              >
                All
              </button>
              <button
                className={`list_footer_btn ${
                  filter === "active" ? "list_footer_btn_active" : ""
                }`}
                onClick={handleShowActiveTodos}
                aria-pressed={filter === "active" ? "true" : "false"}
              >
                Active
              </button>
              <button
                className={`list_footer_btn ${
                  filter === "completed" ? "list_footer_btn_active" : ""
                }`}
                onClick={handleShowCompletedTodos}
                aria-pressed={filter === "completed" ? "true" : "false"}
              >
                Completed
              </button>
            </div>
          </section>
        </div>
      ) : (
        <section className="list_footer">
          <div className="list_footer_counter">
            {numberOfTodosRemaining(todos)}
          </div>
          <div className="flex space-between space-x-6 ">
            <button
              className={`list_footer_btn ${
                filter === "all" ? "list_footer_btn_active" : ""
              }`}
              onClick={handleShowAllTodos}
              aria-pressed={filter === "all" ? "true" : "false"}
            >
              All
            </button>
            <button
              className={`list_footer_btn ${
                filter === "active" ? "list_footer_btn_active" : ""
              }`}
              onClick={handleShowActiveTodos}
              aria-pressed={filter === "active" ? "true" : "false"}
            >
              Active
            </button>
            <button
              className={`list_footer_btn ${
                filter === "completed" ? "list_footer_btn_active" : ""
              }`}
              onClick={handleShowCompletedTodos}
              aria-pressed={filter === "completed" ? "true" : "false"}
            >
              Completed
            </button>
          </div>
          <button
            className="list_footer_btn"
            onClick={handleClearCompletedTodos}
          >
            Clear Completed
          </button>
        </section>
      )}
    </section>
  );
};

export default ToDoList;
