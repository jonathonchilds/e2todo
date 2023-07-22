"use client";
//standard -> related -> local

import { useContext, useState } from "react";
import TodoItem from "@/components/TodoItem";
import { TodoContext } from "@/components/Providers";
import { ITodoItem } from "@/types/todoitem";
import useMediaQuery from "@/hooks/useMediaQuery";

import {
  DragDropContext,
  DropResult,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";

import Footer from "../components/PageFooter";
import TodoList from "../components/TodoList";
import TodoInputField from "../components/TodoInputField";
import PageHeader from "../components/PageHeader";

//The role of onDragEnd is to synchronously update the state of our app to reflect the drag and drop result.
const onDragEnd = (result: DropResult) => {};

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
  return (
    <main className="flex flex-col desktop:w-5/12 w-80 mx-auto relative ">
      <PageHeader />
      <TodoInputField />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todo-item">
          {(provided) => (
            <TodoList {...provided.droppableProps} ref={provided.innerRef} />
          )}
        </Droppable>
      </DragDropContext>
      <Footer />
    </main>
  );
}
