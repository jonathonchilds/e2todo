import Footer from "../components/PageFooter";
import TodoList from "../components/TodoList";
import TodoInputField from "../components/TodoInputField";
import PageHeader from "../components/PageHeader";

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
