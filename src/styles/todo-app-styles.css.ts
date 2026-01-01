import {css} from 'lit';

export const styles = css`
  :host {
    contain: content;
    display: block;
    box-sizing: border-box;
    max-width: min(80%, 780px);
    margin: 0 auto;
    padding: 1rem;
    background-color: var(--md-sys-color-surface-container, #ffe9e6);
  }

  :host::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 2.5rem;
    aspect-ratio: 1;
    clip-path: polygon(100% 100%, 100% 0%, 0 0%);
    background-color: var(--md-sys-color-outline-variant, #ebbbb4);
    opacity: var(--_opacity, 0.3);
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
  }
`;
