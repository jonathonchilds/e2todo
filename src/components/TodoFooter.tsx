"use client";

import React, { useContext, useState } from "react";

import useMediaQuery from "@/customHooks/useMediaQuery";
import { TodoContext } from "../app/Provider";
import { TodoItem } from "@/types/todoTypes";

const TodoListFooter = () => {
  const { todos, removeTodo, todoFilter, setTodoFilter } =
    useContext(TodoContext);

  const isMobile = useMediaQuery("(max-width: 375px)");

  const numberOfTodosRemaining = (todos: TodoItem[]): string => {
    const numberOfTodos = todos.filter((todo) => !todo.isCompleted).length;
    return numberOfTodos === 1
      ? `${numberOfTodos} item left`
      : `${numberOfTodos} items left`;
  };

  const handleShowAllTodos = () => {
    setTodoFilter("all");
  };

  const handleShowActiveTodos = () => {
    setTodoFilter("active");
  };

  const handleShowCompletedTodos = () => {
    setTodoFilter("completed");
  };

  const handleClearCompletedTodos = () => {
    todos
      .filter((todo) => todo.isCompleted)
      .forEach((todo) => removeTodo(todo.id));
    setTodoFilter("all");
  };

  return (
    <div>
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
                  todoFilter === "all" ? "list_footer_btn_active" : ""
                }`}
                onClick={handleShowAllTodos}
                aria-pressed={todoFilter === "all" ? "true" : "false"}
              >
                All
              </button>
              <button
                className={`list_footer_btn ${
                  todoFilter === "active" ? "list_footer_btn_active" : ""
                }`}
                onClick={handleShowActiveTodos}
                aria-pressed={todoFilter === "active" ? "true" : "false"}
              >
                Active
              </button>
              <button
                className={`list_footer_btn ${
                  todoFilter === "completed" ? "list_footer_btn_active" : ""
                }`}
                onClick={handleShowCompletedTodos}
                aria-pressed={todoFilter === "completed" ? "true" : "false"}
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
                todoFilter === "all" ? "list_footer_btn_active" : ""
              }`}
              onClick={handleShowAllTodos}
              aria-pressed={todoFilter === "all" ? "true" : "false"}
            >
              All
            </button>
            <button
              className={`list_footer_btn ${
                todoFilter === "active" ? "list_footer_btn_active" : ""
              }`}
              onClick={handleShowActiveTodos}
              aria-pressed={todoFilter === "active" ? "true" : "false"}
            >
              Active
            </button>
            <button
              className={`list_footer_btn ${
                todoFilter === "completed" ? "list_footer_btn_active" : ""
              }`}
              onClick={handleShowCompletedTodos}
              aria-pressed={todoFilter === "completed" ? "true" : "false"}
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
    </div>
  );
};

export default TodoListFooter;
