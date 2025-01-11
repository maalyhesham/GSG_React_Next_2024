import { useState } from "react";
import Dashboard from "./components/dashboard/dashboard-component";
import Form from "./components/form/form";
import TodoList from "./components/todo-list/todo-list.component";
import { ITodoItem } from "./components/types";
function App() {
  const [todoItems, setTodoItems] = useState<ITodoItem[]>([]);

  const handleNewItem = (item: ITodoItem) => {
    setTodoItems([...todoItems, item]);
  };

  const handleTaskToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const itemId = e.target.dataset["itemId"];
    setTodoItems(
      todoItems.map((item) =>
        item.id === Number(itemId) ? { ...item, isDone: !item.isDone } : item
      )
    );
  };
  const handelDelete = (index: number) => {
    // This will delete the item at index!
    setTodoItems([
      ...todoItems.slice(0, index),
      ...todoItems.slice(index + 1, todoItems.length),
    ]);
  };

  return (
    <div>
      <h1>Todo App - {new Date().toDateString()}</h1>
      <Form onSubmit={handleNewItem} />
      <Dashboard items={todoItems} />
      <TodoList
        items={todoItems}
        onToggle={handleTaskToggle}
        onDelete={handelDelete}
      />
    </div>
  );
}

export default App;
