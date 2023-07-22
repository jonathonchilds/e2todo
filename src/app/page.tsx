"use client";
//standard -> related -> local

import { useContext, useState } from "react";

import {
  DragDropContext,
  DropResult,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";

import TodoItem from "@/components/TodoItem";
import { TodoContext } from "@/components/Providers";
import { ITodoItem } from "@/types/todoitem";
import useMediaQuery from "@/hooks/useMediaQuery";
import Footer from "@/components/PageFooter";

import TodoInputField from "@/components/TodoInputField";
import PageHeader from "@/components/PageHeader";

//The role of onDragEnd is to synchronously update the state of our app to reflect the drag and drop result.

// The droppable uses the render props pattern and expects its children to be a function that returns a React component.
// This is so that react-beautiful-dnd does not need to create any dom nodes for us (React-beautiful-dnd latches into the existing structure)
// LOOK further into render props pattern
// provided is passed into the component, and serves a few important purposes:
// all of the props are listed in the documentation, but generally, one can simply spread the provided object onto the component that is being rendered
// the provided component has a property called innerRef, which is a function used to supply the DOM node of your component to react-beautiful-dnd
// a styled component has a callback prop named innerRef, which returns the DOM node of the component *
// * for newer versions of styled-components (above 4.0.0), use the ref prop instead of innerRef! **
// ** still not working, but I think it's because I'm not using the correct syntax for the ref prop?

// LOOK at styled-components

export default function Page() {
  const onDragEnd = (result: DropResult) => {};
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
    <main className="flex flex-col desktop:w-5/12 w-80 mx-auto relative ">
      <PageHeader />
      <TodoInputField />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todo-item">
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {filteredTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
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
      <Footer />
    </main>
  );
}
