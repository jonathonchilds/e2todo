// upon changing over to this directory and bootstrapping with newest version release,
// I couldn't directly import the images via their filepath within the Image components 
// I fixed the issue by importing the images at the top of the file

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TodoContext } from "./Providers";
import { ITodoItem } from "@/types/todoitem";
import useMediaQuery from "@/hooks/useMediaQuery";

import check from "@/public/icon-check.svg";
import cross from "@/public/icon-cross.svg";

const TodoItem = ({ todo }: { todo: ITodoItem }) => {
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

  return (
    <li
      className="todo_list_item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
  );
};

export default TodoItem;
