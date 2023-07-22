"use client";

import { useContext, useState } from "react";

import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

import useMediaQuery from "@/customHooks/useMediaQuery";
import { TodoItem } from "@/types/todoTypes";
import { TodoContext } from "@/app/Provider";

import Todo from "@/components/Todo";
import Footer from "@/components/PageFooter";
import TodoInputField from "@/components/TodoInput";
import PageHeader from "@/components/PageHeader";
import TodoListFooter from "@/components/TodoFooter";

export default function Page() {
  const { todos, setTodos, todoFilter } = useContext(TodoContext);

  const filteredTodos = todos.filter((todo) => {
    if (todoFilter === "active") {
      return !todo.isCompleted;
    } else if (todoFilter === "completed") {
      return todo.isCompleted;
    }
    return true;
  });

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination!.index, 0, reorderedItem);
    setTodos(items);
  };

  return (
    <main className="flex flex-col desktop:w-5/12 w-80 mx-auto relative ">
      <PageHeader />
      <TodoInputField />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todoListContainer">
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {filteredTodos.map((todo, index) => (
                <Todo key={todo.id} todo={todo} index={index} />
              ))}

              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <TodoListFooter />
      <Footer />
    </main>
  );
}
