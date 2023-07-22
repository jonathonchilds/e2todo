import Footer from "../components/PageFooter";
import TodoList from "../components/TodoList";
import TodoInputField from "../components/TodoInputField";
import PageHeader from "../components/PageHeader";

import {
  DragDropContext,
  DropResult,
  OnDragEndResponder,
} from "react-beautiful-dnd";

//The role of onDragEnd is to synchronously update the state of our app to reflect the drag and drop result.
const onDragEnd = (result: DropResult) => {};

export default function Page() {
  return (
    <main className="flex flex-col desktop:w-5/12 w-80 mx-auto relative ">
      <PageHeader />
      <TodoInputField />
      <DragDropContext onDragEnd={onDragEnd}>
        <TodoList />
      </DragDropContext>
      <Footer />
    </main>
  );
}
