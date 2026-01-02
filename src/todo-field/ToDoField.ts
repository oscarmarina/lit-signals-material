import {watch} from '@lit-labs/signals';
import {html, LitElement} from 'lit';
import {state} from 'lit/decorators.js';
//import {ShowLifecycle} from '../ShowLifecycle.js';
import {createRef, ref} from 'lit/directives/ref.js';
import {type Store, store} from '../store.js';
import '@material/web/button/filled-button.js';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/checkbox/checkbox.js';
import {styles} from './styles/todo-field-styles.css.js';

export class ToDoField extends LitElement {
  static override styles = [styles];

  #inputRef = createRef<HTMLInputElement>();

  @state()
  store: Store = store;

  override render() {
    return html`
      ${this._textFieldTpl} ${this._summaryTpl}
    `;
  }

  protected get _textFieldTpl() {
    return html`
      <div>
        <md-outlined-text-field
          label="New Task"
          class="input"
          ${ref(this.#inputRef)}
          placeholder="What do you need to do"
          @keyup="${this._addTodoOnEnter}"></md-outlined-text-field>
        <md-filled-button @click="${this._addTodoOnClick}">
          Add
          <md-icon slot="icon">add</md-icon>
        </md-filled-button>
      </div>
    `;
  }

  protected get _summaryTpl() {
    return html`
      <div>
        <span>
          <strong>${watch(this.store.count)}</strong>
          task
        </span>
        <span class="join">⧫</span>
        <span>
          <strong>${watch(this.store.completedCount)}</strong>
          completed
        </span>
        <span class="join">︱</span>
        <md-checkbox
          aria-label="Select all checkboxes"
          @change="${({target}: Event & {target: HTMLInputElement}) =>
            this.store.toggleAllTodos(target.checked)}"
          .checked="${watch(this.store.done)}"
          .indeterminate="${watch(this.store.inProgress)}"></md-checkbox>
      </div>
    `;
  }

  private _addTodoOnEnter(ev: KeyboardEvent & {target: HTMLInputElement}) {
    const {key, target} = ev;
    if (key === 'Enter') {
      this.store.addTodo(target.value);
      target.value = '';
    }
  }

  private _addTodoOnClick() {
    const textField = this.#inputRef.value;
    const event = new KeyboardEvent('keyup', {
      key: 'Enter',
    });
    textField?.dispatchEvent(event);
    textField?.focus();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'todo-field': ToDoField;
  }
}
