import {html, fixture, assert, expect, fixtureCleanup} from '@open-wc/testing';
import {TodoApp} from '../src/TodoApp.js';
import '../src/define/todo-app.js';

suite('TodoApp', () => {
  let el: TodoApp;

  teardown(() => fixtureCleanup());

  suite('Default', () => {
    setup(async () => {
      el = await fixture(html`
        <todo-app>light-dom</todo-app>
      `);
    });

    suite('Semantic Dom and a11y', () => {
      test('SHADOW DOM - Structure test', async () => {
        await expect(el).shadowDom.to.equalSnapshot();
      });

      test('LIGHT DOM - Structure test', async () => {
        await expect(el).lightDom.to.equalSnapshot();
      });

      test.skip('a11y', async () => {
        await assert.isAccessible(el);
      });
    });
  });

  suite('Property', () => {
    setup(async () => {
      el = await fixture(html`
        <todo-app>light-dom</todo-app>
      `);
      el.todos = [
        {task: 'Task 1', completed: false},
        {task: 'Task 2', completed: false},
        {task: 'Task 3', completed: true},
      ];
    });

    suite('Semantic Dom and a11y', () => {
      test('SHADOW DOM - Structure test', async () => {
        await expect(el).shadowDom.to.equalSnapshot();
      });

      test('LIGHT DOM - Structure test', async () => {
        await expect(el).lightDom.to.equalSnapshot();
      });
    });
  });
});
