import {beforeAll, afterAll, suite, expect, test} from 'vitest';
import {html} from 'lit';
import {getDiffableHTML} from '@open-wc/semantic-dom-diff';
import {assert as a11y, fixture, fixtureCleanup} from '@open-wc/testing';
import {TodoApp} from '../src/TodoApp.js';
import '../src/define/todo-app.js';

suite('TodoApp', () => {
  let el: TodoApp;
  let elShadowRoot: string;

  suite('Semantic Dom and a11y', () => {
    beforeAll(async () => {
      el = await fixture(html`
        <todo-app>light-dom</todo-app>
      `);
      elShadowRoot = el?.shadowRoot!.innerHTML;
    });

    afterAll(() => {
      fixtureCleanup();
    });

    test('SHADOW DOM - Structure test', () => {
      expect(getDiffableHTML(elShadowRoot)).toMatchSnapshot('SHADOW DOM');
    });

    test('LIGHT DOM - Structure test', () => {
      expect(getDiffableHTML(el, {ignoreAttributes: ['id']})).toMatchSnapshot('LIGHT DOM');
    });

    test.skip('a11y', async () => {
      await a11y.isAccessible(el);
    });
  });

  suite('Property ', () => {
    beforeAll(async () => {
      el = await fixture(html`
        <todo-app>light-dom</todo-app>
      `);
      el.todos = [
        {task: 'Task 1', completed: false},
        {task: 'Task 2', completed: false},
        {task: 'Task 3', completed: true},
      ];
      elShadowRoot = el?.shadowRoot!.innerHTML;
    });

    afterAll(() => {
      fixtureCleanup();
    });

    test('SHADOW DOM - Structure test', () => {
      expect(getDiffableHTML(elShadowRoot)).toMatchSnapshot('SHADOW DOM');
    });

    test('LIGHT DOM - Structure test', () => {
      expect(getDiffableHTML(el, {ignoreAttributes: ['id']})).toMatchSnapshot('LIGHT DOM');
    });
  });
});
