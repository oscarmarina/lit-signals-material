import {css} from 'lit';

export const styles = css`:host {
  display: block;
  box-sizing: border-box;
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

md-checkbox {
  vertical-align: middle;
}

md-outlined-text-field {
  flex: 1;
}

md-filled-button {
  vertical-align: middle;
  margin-left: 0.5rem;
}

div {
  display: flex;
  align-items: center;
  padding: 1rem 1rem 0.5rem;
}
div + div {
  margin-bottom: 0.5rem;
}

.join {
  display: inline-block;
  margin: 0 0.25rem;
  color: var(--md-sys-color-primary, #6750a4);
}`;
