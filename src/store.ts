import {signal, computed} from '@lit-labs/signals';

export interface Todo {
  task: string;
  completed: boolean;
}

export interface Store {
  todos: ReturnType<typeof signal<Todo[]>>;
  count: ReturnType<typeof computed<number>>;
  completed: ReturnType<typeof computed<Todo[]>>;
  uncompleted: ReturnType<typeof computed<Todo[]>>;
  completedCount: ReturnType<typeof computed<number>>;
  uncompletedCount: ReturnType<typeof computed<number>>;
  inProgress: ReturnType<typeof computed<boolean>>;
  done: ReturnType<typeof computed<boolean>>;
  setTodos: (todosValue: Todo[], initialize?: boolean) => void;
  addTodo: (task: string, completed?: boolean) => boolean;
  toggleAllTodos: (completed: boolean) => void;
  toggleTodo: (todo: Todo, completed: boolean) => void;
  moveTodoUp: (todo: Todo) => void;
  moveTodoDown: (todo: Todo) => void;
  deleteTodo: (toDelete: Todo) => void;
  deleteCompletedTodos: () => void;
}

const moveItem = (items: Todo[], from: number, to: number) =>
  from === to ? items : items.toSpliced(from, 1).toSpliced(to, 0, items[from]);

export const createStore = (todos: Todo[]) => {
  const store: Store = {
    todos: signal(todos),
    count: computed(() => store.todos.get().length),
    completed: computed(() => store.todos.get().filter((item) => item.completed)),
    uncompleted: computed(() => store.todos.get().filter((item) => !item.completed)),
    completedCount: computed(() => store.completed.get().length),
    uncompletedCount: computed(() => store.uncompleted.get().length),
    inProgress: computed(
      () =>
        store.count.get() > 0 &&
        store.completedCount.get() < store.count.get() &&
        store.completedCount.get() > 0
    ),
    done: computed(() => store.count.get() > 0 && store.count.get() === store.completedCount.get()),
    setTodos(todosValue, initialize = false) {
      if (todosValue?.length > 0) {
        store.todos.set(todosValue);
      } else {
        store.todos.set(initialize ? todos : []);
      }
    },
    addTodo(task, completed = false) {
      if (!task) {
        return false;
      }
      store.setTodos([...store.todos.get(), {task, completed}]);
      return true;
    },
    toggleAllTodos(completed) {
      store.setTodos(store.todos.get().map((todo) => ({...todo, completed})));
    },
    toggleTodo(todo, completed) {
      const todoRef = todo;
      todoRef.completed = completed;
      store.setTodos([...store.todos.get()]);
    },
    moveTodoUp(todo) {
      const currentTodos = store.todos.get();
      const i = currentTodos.indexOf(todo);
      store.setTodos(moveItem(currentTodos, i, Math.max(i - 1, 0)));
    },
    moveTodoDown(todo) {
      const currentTodos = store.todos.get();
      const i = currentTodos.indexOf(todo);
      store.setTodos(moveItem(currentTodos, i, Math.min(i + 1, currentTodos.length - 1)));
    },
    deleteTodo(toDelete) {
      store.setTodos(store.todos.get().filter((todo) => todo !== toDelete));
    },
    deleteCompletedTodos() {
      store.setTodos(store.todos.get().filter((todo) => !todo.completed));
    },
  };
  return store;
};

export const store = createStore([
  {task: 'lift', completed: false},
  {task: 'go for a walk', completed: false},
  {task: 'get bananas from store', completed: true},
  {task: 'lunch with the gang', completed: false},
  {task: 'get some work done', completed: false},
  {task: 'walk the dog', completed: false},
]);
