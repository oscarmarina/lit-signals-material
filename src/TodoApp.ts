// import {ShowLifecycle} from './ShowLifecycle.js';
import {SignalWatcher, watch} from '@lit-labs/signals';
import {html, LitElement, type PropertyValues} from 'lit';
import {property, state} from 'lit/decorators.js';
import './fetch.js';
import {type Store, store, type Todo} from './store.js';
import '@material/web/progress/linear-progress.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/icon/icon.js';
import './define/todo-field.js';
import './define/todo-list.js';
import {styles} from './styles/todo-app-styles.css.js';

// https://github.com/haydenbleasel/ultracite
/**
 * ![Lit](https://img.shields.io/badge/lit-3.0.0-blue.svg)
 *
 * To begin understanding the use and potential of signals with Lit, there’s nothing better than learning from experts.
 * I’ve combined different approaches from:
 *
 * - [Reactive State with Signals in Lit by Justin Fagnani](https://justinfagnani.com/2024/10/09/reactive-state-with-signals-in-lit/)
 * - [Todo App - Lit & Signals](https://lit.dev/playground/#gist=278c5029024866a2cd4c99a7f6b25e44)
 * - [Todo App - Angular & Material](https://stackblitz.com/edit/stackblitz-starters-ielbus?file=src%2Fcomponents%2Ftodo-app%2Ftodo-app.html)
 *
 * And tested using:
 *
 * - [Signal-utils - effect](https://github.com/proposal-signals/signal-utils?tab=readme-ov-file#leaky-effect-via-queuemicrotask)
 * - [When to use Lit's computed, a.k.a. `willUpdate`, vs `signals`; for dark mode](https://lit.dev/docs/components/lifecycle/#willupdate)
 * - [Integrating Material Components](https://github.com/material-components/material-web)
 *
 * ### Demo
 *
 * [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/oscarmarina/lit-signals-material?file=README.md)
 *
 * <hr>
 */
export class TodoApp extends (SignalWatcher(LitElement) as unknown as typeof LitElement) {
  #colorSchemeToIcon = {
    light: {icon: 'light_mode', label: 'Light Theme'},
    dark: {icon: 'dark_mode', label: 'Dark Theme'},
    auto: {icon: 'routine', label: 'System Theme'},
  } as const;

  static override styles = [styles];

  @state()
  store: Store = store;

  @state()
  _currentColorScheme = 'light' as 'auto' | 'dark' | 'light';

  @state()
  _icon = 'light_mode';

  @state()
  _label = 'Light Theme';

  @property({type: Array})
  todos?: Todo[];

  override willUpdate(props: PropertyValues<this>) {
    super.willUpdate?.(props);

    if (props.has('todos') && this.todos) {
      store.setTodos(this.todos);
    }

    if (props.has('_currentColorScheme')) {
      const {icon, label} = this.#colorSchemeToIcon[this._currentColorScheme];
      this._icon = icon;
      this._label = label;
    }
  }

  override render() {
    return html`
      <div>
        <slot></slot>
        ${this._colorSchemeTpl}
      </div>
      <todo-field .store="${this.store}"></todo-field>
      ${this._progressTpl}
      <todo-list .store="${this.store}"></todo-list>
    `;
  }

  protected get _colorSchemeTpl() {
    return html`
      <md-icon-button
        aria-live="assertive"
        aria-label="${this._label}"
        @click="${this._onToggleColorScheme}">
        <md-icon>${this._icon}</md-icon>
      </md-icon-button>
    `;
  }

  protected get _progressTpl() {
    return html`
      <md-linear-progress
        aria-label="Total tasks progress"
        .value="${watch(this.store.completedCount)}"
        .max="${watch(this.store.count)}"></md-linear-progress>
    `;
  }

  _onToggleColorScheme() {
    this._currentColorScheme = this._currentColorScheme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.prefersColorScheme = this._currentColorScheme;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'todo-app': TodoApp;
  }
}
