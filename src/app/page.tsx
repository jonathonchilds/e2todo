import Footer from "../components/PageFooter";
import TodoList from "../components/TodoList";
import TodoInputField from "../components/TodoInputField";
import PageHeader from "../components/PageHeader";

import {
  DragDropContext,
  DropResult,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";

//The role of onDragEnd is to synchronously update the state of our app to reflect the drag and drop result.
const onDragEnd = (result: DropResult) => {};

// The droppable uses the render props pattern and expects its children to be a function that returns a React component.

export default function Page() {
  return (
    <main className="flex flex-col desktop:w-5/12 w-80 mx-auto relative ">
      <PageHeader />
      <TodoInputField />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={"todo-item"}>{() => <TodoList />}</Droppable>
      </DragDropContext>
      <Footer />
    </main>
  );
}
