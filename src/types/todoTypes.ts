export type TodoFilter = "all" | "active" | "completed";

export type TodoItem = {
  id: number;
  body: string;
  isCompleted: boolean;
};

export type TodoContextType = {
  todos: TodoItem[];
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  todoFilter: TodoFilter;
  setTodoFilter: React.Dispatch<React.SetStateAction<TodoFilter>>;
  addTodo: (todo: TodoItem) => void;
  removeTodo: (id: number) => void;
  updateTodo: (updatedTodo: TodoItem) => void;
};
