// upon changing over to this directory and bootstrapping with newest version release,
// I couldn't directly import the images via their filepath within the Image components
// I fixed the issue by importing the images at the top of the file

"use client";

import React, { useState } from "react";
import Image from "next/image";

import { Draggable } from "react-beautiful-dnd";

import { TodoContext } from "../app/Provider";
import { TodoItem } from "@/types/todoTypes";
import useMediaQuery from "@/customHooks/useMediaQuery";
import check from "@/public/icon-check.svg";
import cross from "@/public/icon-cross.svg";

const Todo = ({ todo, index }: { todo: TodoItem; index: number }) => {
  const [isHovered, setisHovered] = useState(false);
  const { removeTodo, updateTodo } = React.useContext(TodoContext);
  const isMobile = useMediaQuery("(max-width: 375px)");

  const handleMouseEnter = () => {
    setisHovered(true);
  };
  const handleMouseLeave = () => {
    setisHovered(false);
  };
  const handleCheckmark = () => {
    updateTodo({ ...todo, isCompleted: !todo.isCompleted });
  };

  const handleDelete = () => {
    removeTodo(todo.id);
  };

  // ** Remember - Draggable component expects its child to be a function
  // the first argument of the function is an object that contains a property called provided
  // ****
  // ****
  // MOVE DRAG HANDLE PROPS TO THE APPROPRIATE LOCATION OF THE COMPONENT (THE LABEL) - Unnecessary, as this doesn't interfere with the buttons! :)

  // OK! I had the index set to the todo.id, which was giving me the weird behavior of only the last item in the list being able to be sorted in-between other elements.
  // now, with the index passed through properly to the draggable component, I can drag and drop the items in the list
  // I had to add the index as a prop and pass that through the map function in the Page component
  // (Furthermore, in my first try at this, I'm pretty sure I set the draggableId = {"hard-coded string"}!! That was causing the awful behavior
  // of grabbing only the last item in the list, no matter where I clicked, and making the rest of the list disappear.)
  // tested adding, removing, clearing all, and marking todo complete. All working ok.

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <li
          className="todo_list_item"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="flex space-x-5">
            <div className="flex justify-center items-center  ">
              <div
                className={` ${
                  todo.isCompleted ? "gradient_circle_btn" : "gray_circle_btn "
                }`}
                onClick={handleCheckmark}
              ></div>
              {todo.isCompleted && (
                <Image
                  src={check}
                  height="18"
                  width="18"
                  alt="white checkmark"
                  className="absolute cursor-pointer h-2.5 w-3"
                  onClick={handleCheckmark}
                />
              )}
            </div>
            <div
              className={`${
                todo.isCompleted
                  ? "todo_completed"
                  : "dark:text-dark-l-grayish-blue text-light-vd-grayish-blue  flex items-center"
              }`}
            >
              <span>{todo.body}</span>
            </div>
          </div>
          {isMobile && (
            <button onClick={handleDelete}>
              <Image
                src={cross}
                alt="cross ('x') icon"
                width="18"
                height="18"
                className="cursor-pointer w-3 h-3"
              ></Image>
            </button>
          )}
          {isHovered && !isMobile && (
            <button onClick={handleDelete}>
              <Image
                src={cross}
                alt="cross ('x') icon"
                width="18"
                height="18"
                className="cursor-pointer w-5 h-5"
              ></Image>
            </button>
          )}
        </li>
      )}
    </Draggable>
  );
};

export default Todo;
