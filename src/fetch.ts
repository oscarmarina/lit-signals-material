import {effect} from 'signal-utils/subtle/microtask-effect';
import {store} from './store.js';

const todosStore = localStorage.getItem('todos-store');
store.setTodos(todosStore ? JSON.parse(todosStore) : [], true);

effect(() => localStorage.setItem('todos-store', JSON.stringify(store.todos.get())));
