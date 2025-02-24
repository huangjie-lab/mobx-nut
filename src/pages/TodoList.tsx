// import { observer } from "mobx-react";
import { observer } from "../whtch";

import todoStore, { Todo } from "../store/TodoStore";
import { FC } from "react";
function TodoList(props: { todoList: string }) {
  const addNewTodo = () => {
    todoStore.addTodo(prompt("输入新的待办任务", "来杯水") as string);
  };
  return (
    <>
      <h1>TodoList</h1>
      <button onClick={addNewTodo}>新增任务</button>
      <ul>
        {todoStore.todoList.map((todo: Todo, index: number) => (
          <TodoView key={index} todo={todo} index={index} />
        ))}
      </ul>

      <p>{todoStore.report}</p>
      <p>完成：{todoStore.completedTodoCount}</p>
    </>
  );
}

interface TodoViewProps {
  todo: Todo;
  index: number;
}

const TodoView = observer(({ todo, index }: TodoViewProps) => {
  return (
    <li
      onDoubleClick={() => {
        todoStore.eidtTodo(index, {
          ...todo,
          task: (prompt("输入新的待办任务", todo.task) || todo.task) as string,
        });
      }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => {
          todoStore.eidtTodo(index, {
            ...todo,
            completed: !todo.completed,
          });
        }}
      />
      {todo.task}
    </li>
  );
});

TodoList.displayName = "TodoList";
export default observer(TodoList);
