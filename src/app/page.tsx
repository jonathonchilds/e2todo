import Footer from "../components/PageFooter";
import TodoList from "../components/TodoList";
import TodoInputField from "../components/TodoInputField";
import PageHeader from "../components/PageHeader";

//The role of onDragEnd is to synchronously update the state of our app to reflect the drag and drop result.

export default function Page() {
  return (
    <main className="flex flex-col desktop:w-5/12 w-80 mx-auto relative ">
      <PageHeader />
      <TodoInputField />
      <TodoList />
      <Footer />
    </main>
  );
}
