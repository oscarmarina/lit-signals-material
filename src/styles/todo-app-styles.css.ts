import {css} from 'lit';

export const styles = css`:host {
  contain: content;
  display: block;
  box-sizing: border-box;
  max-width: min(80%, 780px);
  margin: 0 auto;
  padding: 1rem;
  background-color: var(--md-sys-color-surface-container, #f3edf7);
}

:host([hidden]),
[hidden] {
  display: none !important;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

div {
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
}

md-icon-button {
  margin-left: auto;
}`;
