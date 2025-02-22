import { makeObservable, action, observable, computed } from "../whtch";

export type Todo = {
  task: string;
  completed: boolean;
  assignee: string | null;
};

export type TodoList = Todo[];

class TodoStore {
  constructor() {
    makeObservable(this, {
      todoList: observable,
      addTodo: action,
      eidtTodo: action,
      completedTodoCount: computed,
    });
  }

  todoList: TodoList = [
    {
      task: "喝水",
      completed: false,
      assignee: null,
    },
  ];

  addTodo = (task: string) => {
    this.todoList.push({
      task,
      completed: false,
      assignee: null,
    });
  };

  get completedTodoCount() {
    return this.todoList.filter((todo: Todo) => todo.completed).length;
  }

  get report() {
    if (this.todoList.length === 0) {
      return "无";
    }

    const nextTodo = this.todoList.find((todo) => todo.completed === false);

    if (nextTodo === undefined) {
      return `全部完成`;
    }

    return `下一个待办"${nextTodo?.task}"。进度${this.completedTodoCount}/${this.todoList.length}`;
  }

  eidtTodo = (index: number, todo: Todo) => {
    this.todoList[index] = todo;
  };
}

const todoStore = new TodoStore();

export default todoStore;
