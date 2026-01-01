import {getDiffableHTML} from '@open-wc/semantic-dom-diff/get-diffable-html.js';
// import {type LocatorSelectors, utils} from 'vitest/browser';
import {fixture, fixtureCleanup} from '@open-wc/testing-helpers';
import {chaiA11yAxe} from 'chai-a11y-axe';
import {html} from 'lit';
import {afterAll, beforeAll, chai, describe, expect, it} from 'vitest';
import type {TodoApp} from '../src/TodoApp.js';
import '../src/define/todo-app.js';

chai.use(chaiA11yAxe);

describe('TodoApp', () => {
  let el: TodoApp;
  let elShadowRoot: string;

  describe('Semantic Dom and a11y', () => {
    beforeAll(async () => {
      el = await fixture(html`
        <todo-app>light-dom</todo-app>
      `);
      elShadowRoot = el?.shadowRoot?.innerHTML ?? '';
    });

    afterAll(() => {
      fixtureCleanup();
    });

    it('SHADOW DOM - Structure it', () => {
      expect(getDiffableHTML(elShadowRoot)).toMatchSnapshot('SHADOW DOM');
    });

    it('LIGHT DOM - Structure it', () => {
      expect(getDiffableHTML(el, {ignoreAttributes: ['id', 'style']})).toMatchSnapshot('LIGHT DOM');
    });

    it.skip('a11y', async () => {
      await expect(el).accessible();
    });
  });

  describe('Property ', () => {
    beforeAll(async () => {
      el = await fixture(html`
        <todo-app>light-dom</todo-app>
      `);
      el.todos = [
        {task: 'Task 1', completed: false},
        {task: 'Task 2', completed: false},
        {task: 'Task 3', completed: true},
      ];
      elShadowRoot = el?.shadowRoot?.innerHTML ?? '';
    });

    afterAll(() => {
      fixtureCleanup();
    });

    it('SHADOW DOM - Structure it', () => {
      expect(getDiffableHTML(elShadowRoot)).toMatchSnapshot('SHADOW DOM');
    });

    it('LIGHT DOM - Structure it', () => {
      expect(getDiffableHTML(el, {ignoreAttributes: ['id', 'style']})).toMatchSnapshot('LIGHT DOM');
    });
  });
});
