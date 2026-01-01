![Lit](https://img.shields.io/badge/lit-3.0.0-blue.svg)

To begin understanding the use and potential of signals with Lit, there’s nothing better than learning from experts.
I’ve combined different approaches from:

- [Reactive State with Signals in Lit by Justin Fagnani](https://justinfagnani.com/2024/10/09/reactive-state-with-signals-in-lit/)
- [Todo App - Lit & Signals](https://lit.dev/playground/#gist=278c5029024866a2cd4c99a7f6b25e44)
- [Todo App - Angular & Material](https://stackblitz.com/edit/stackblitz-starters-ielbus?file=src%2Fcomponents%2Ftodo-app%2Ftodo-app.html)

And tested using:

- [Signal-utils - effect](https://github.com/proposal-signals/signal-utils?tab=readme-ov-file#leaky-effect-via-queuemicrotask)
- [When to use Lit's computed, a.k.a. `willUpdate`, vs `signals`; for dark mode](https://lit.dev/docs/components/lifecycle/#willupdate)
- [Integrating Material Components](https://github.com/material-components/material-web)

### Demo

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/oscarmarina/lit-signals-material?file=README.md)

<hr>

### `src/TodoApp.ts`:

#### class: `TodoApp`, `todo-app`

##### Fields

| Name                  | Privacy | Type                  | Default         | Description | Inherited From |
| --------------------- | ------- | --------------------- | --------------- | ----------- | -------------- |
| `store`               |         | `Store`               | `store`         |             |                |
| `_currentColorScheme` |         |                       | `'light'`       |             |                |
| `_icon`               |         | `string`              | `'light_mode'`  |             |                |
| `_label`              |         | `string`              | `'Light Theme'` |             |                |
| `todos`               |         | `Todo[] \| undefined` |                 |             |                |

##### Methods

| Name                   | Privacy | Description | Parameters | Return | Inherited From |
| ---------------------- | ------- | ----------- | ---------- | ------ | -------------- |
| `_onToggleColorScheme` |         |             |            |        |                |

##### Attributes

| Name    | Field | Inherited From |
| ------- | ----- | -------------- |
| `todos` | todos |                |

<details><summary>Private API</summary>

##### Fields

| Name                 | Privacy | Type | Default | Description | Inherited From |
| -------------------- | ------- | ---- | ------- | ----------- | -------------- |
| `#colorSchemeToIcon` | private | `{   |

    light: {icon: 'light_mode', label: 'Light Theme'},
    dark: {icon: 'dark_mode', label: 'Dark Theme'},
    auto: {icon: 'routine', label: 'System Theme'},

}`|`{ light: {icon: 'light_mode', label: 'Light Theme'}, dark: {icon: 'dark_mode', label: 'Dark Theme'}, auto: {icon: 'routine', label: 'System Theme'}, }`|             |                |
|`\_colorSchemeTpl`   | protected |                                                                                                                                                                        |                                                                                                                                                          |             |                |
|`\_progressTpl` | protected | | | | |

</details>

<hr/>

#### Exports

| Kind | Name      | Declaration | Module         | Package |
| ---- | --------- | ----------- | -------------- | ------- |
| `js` | `TodoApp` | TodoApp     | src/TodoApp.ts |         |

### `src/index.ts`:

#### Exports

| Kind | Name        | Declaration | Module                    | Package |
| ---- | ----------- | ----------- | ------------------------- | ------- |
| `js` | `TodoApp`   | TodoApp     | ./TodoApp.js              |         |
| `js` | `ToDoField` | ToDoField   | ./todo-field/ToDoField.js |         |
| `js` | `ToDoList`  | ToDoList    | ./todo-list/ToDoList.js   |         |

### `src/store.ts`:

#### Variables

| Name    | Description | Type    |
| ------- | ----------- | ------- |
| `store` |             | `Store` |

<hr/>

#### Functions

| Name          | Description | Parameters      | Return |
| ------------- | ----------- | --------------- | ------ |
| `createStore` |             | `todos: Todo[]` |        |

<hr/>

#### Exports

| Kind | Name          | Declaration | Module       | Package |
| ---- | ------------- | ----------- | ------------ | ------- |
| `js` | `createStore` | createStore | src/store.ts |         |
| `js` | `store`       | store       | src/store.ts |         |

### `src/assets/icons.ts`:

#### Variables

| Name   | Description | Type |
| ------ | ----------- | ---- |
| `up`   |             |      |
| `down` |             |      |
| `bin`  |             |      |

<hr/>

#### Exports

| Kind | Name   | Declaration | Module              | Package |
| ---- | ------ | ----------- | ------------------- | ------- |
| `js` | `up`   | up          | src/assets/icons.ts |         |
| `js` | `down` | down        | src/assets/icons.ts |         |
| `js` | `bin`  | bin         | src/assets/icons.ts |         |

### `src/define/todo-app.ts`:

#### Exports

| Kind                        | Name       | Declaration | Module          | Package |
| --------------------------- | ---------- | ----------- | --------------- | ------- |
| `custom-element-definition` | `todo-app` | TodoApp     | /src/TodoApp.js |         |

### `src/define/todo-field.ts`:

#### Exports

| Kind                        | Name         | Declaration | Module                       | Package |
| --------------------------- | ------------ | ----------- | ---------------------------- | ------- |
| `custom-element-definition` | `todo-field` | ToDoField   | /src/todo-field/ToDoField.js |         |

### `src/define/todo-list.ts`:

#### Exports

| Kind                        | Name        | Declaration | Module                     | Package |
| --------------------------- | ----------- | ----------- | -------------------------- | ------- |
| `custom-element-definition` | `todo-list` | ToDoList    | /src/todo-list/ToDoList.js |         |

### `src/todo-list/ToDoList.ts`:

#### class: `ToDoList`, `todo-list`

##### Fields

| Name    | Privacy | Type    | Default | Description | Inherited From |
| ------- | ------- | ------- | ------- | ----------- | -------------- |
| `store` |         | `Store` | `store` |             |                |

<details><summary>Private API</summary>

##### Fields

| Name        | Privacy   | Type | Default | Description | Inherited From |
| ----------- | --------- | ---- | ------- | ----------- | -------------- |
| `_todosTpl` | protected |      |         |             |                |

##### Methods

| Name             | Privacy   | Description | Parameters                     | Return | Inherited From |
| ---------------- | --------- | ----------- | ------------------------------ | ------ | -------------- |
| `_todoItemTpl`   | protected |             | `todo: Todo`                   |        |                |
| `_toggleChecked` | private   |             | `todo: Todo, checked: boolean` |        |                |

</details>

<hr/>

#### Exports

| Kind | Name       | Declaration | Module                    | Package |
| ---- | ---------- | ----------- | ------------------------- | ------- |
| `js` | `ToDoList` | ToDoList    | src/todo-list/ToDoList.ts |         |

### `src/todo-field/ToDoField.ts`:

#### class: `ToDoField`, `todo-field`

##### Fields

| Name    | Privacy | Type    | Default | Description | Inherited From |
| ------- | ------- | ------- | ------- | ----------- | -------------- |
| `store` |         | `Store` | `store` |             |                |

<details><summary>Private API</summary>

##### Fields

| Name            | Privacy   | Type | Default | Description | Inherited From |
| --------------- | --------- | ---- | ------- | ----------- | -------------- |
| `#inputRef`     | private   |      |         |             |                |
| `_textFieldTpl` | protected |      |         |             |                |
| `_summaryTpl`   | protected |      |         |             |                |

##### Methods

| Name              | Privacy | Description | Parameters                                       | Return | Inherited From |
| ----------------- | ------- | ----------- | ------------------------------------------------ | ------ | -------------- |
| `_addTodoOnEnter` | private |             | `ev: KeyboardEvent & {target: HTMLInputElement}` |        |                |
| `_addTodoOnClick` | private |             |                                                  |        |                |

</details>

<hr/>

#### Exports

| Kind | Name        | Declaration | Module                      | Package |
| ---- | ----------- | ----------- | --------------------------- | ------- |
| `js` | `ToDoField` | ToDoField   | src/todo-field/ToDoField.ts |         |

### `src/styles/todo-app-styles.css.ts`:

#### Variables

| Name     | Description | Type |
| -------- | ----------- | ---- |
| `styles` |             |      |

<hr/>

#### Exports

| Kind | Name     | Declaration | Module                            | Package |
| ---- | -------- | ----------- | --------------------------------- | ------- |
| `js` | `styles` | styles      | src/styles/todo-app-styles.css.ts |         |

### `src/todo-list/styles/todo-list-styles.css.ts`:

#### Variables

| Name     | Description | Type |
| -------- | ----------- | ---- |
| `styles` |             |      |

<hr/>

#### Exports

| Kind | Name     | Declaration | Module                                       | Package |
| ---- | -------- | ----------- | -------------------------------------------- | ------- |
| `js` | `styles` | styles      | src/todo-list/styles/todo-list-styles.css.ts |         |

### `src/todo-field/styles/todo-field-styles.css.ts`:

#### Variables

| Name     | Description | Type |
| -------- | ----------- | ---- |
| `styles` |             |      |

<hr/>

#### Exports

| Kind | Name     | Declaration | Module                                         | Package |
| ---- | -------- | ----------- | ---------------------------------------------- | ------- |
| `js` | `styles` | styles      | src/todo-field/styles/todo-field-styles.css.ts |         |

### `src/ShowLifecycle.ts`:

#### class: `ShowLifecycle`

<hr/>

#### Exports

| Kind | Name            | Declaration   | Module               | Package |
| ---- | --------------- | ------------- | -------------------- | ------- |
| `js` | `ShowLifecycle` | ShowLifecycle | src/ShowLifecycle.ts |         |
