import {computed, SignalWatcher, watch} from '@lit-labs/signals';
import {html, LitElement} from 'lit';
//import {ShowLifecycle} from '../ShowLifecycle.js';
import {state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {type Store, store, type Todo} from '../store.js';
import '@material/web/list/list.js';
import '@material/web/list/list-item.js';
import '@material/web/checkbox/checkbox.js';
import '@material/web/iconbutton/icon-button.js';
import * as icons from '../assets/icons.js';
import {styles} from './styles/todo-list-styles.css.js';

export class ToDoList extends (SignalWatcher(LitElement) as unknown as typeof LitElement) {
  static override styles = [styles];

  @state()
  store: Store = store;

  protected _todoItemTpl(todo: Todo) {
    return html`
      <md-list-item type="button" class="${classMap({completed: todo.completed})}">
        <label slot="start">
          <md-checkbox
            @change="${({target}: Event & {target: HTMLInputElement}) =>
              this._toggleChecked(todo, target.checked)}"
            .checked="${todo.completed}"></md-checkbox>
          ${todo.task}
        </label>
        <div slot="end">
          <md-icon-button aria-label="Up" @click="${() => this.store.moveTodoUp(todo)}">
            ${unsafeHTML(icons.up)}
          </md-icon-button>
          <md-icon-button aria-label="Down" @click="${() => this.store.moveTodoDown(todo)}">
            ${unsafeHTML(icons.down)}
          </md-icon-button>
          <md-icon-button aria-label="Delete" @click="${() => this.store.deleteTodo(todo)}">
            ${unsafeHTML(icons.bin)}
          </md-icon-button>
        </div>
      </md-list-item>
    `;
  }

  protected get _todosTpl() {
    return computed(() => this.store.todos.get().map((todo) => this._todoItemTpl(todo)));
  }

  override render() {
    return html`
      <md-list>${watch(this._todosTpl)}</md-list>
    `;
  }

  private _toggleChecked(todo: Todo, checked: boolean) {
    this.store.toggleTodo(todo, checked);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'todo-list': ToDoList;
  }
}
