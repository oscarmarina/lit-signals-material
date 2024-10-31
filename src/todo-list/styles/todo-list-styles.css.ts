import {css} from 'lit';

export const styles = css`:host {
  --md-list-item-top-space: 0;
  --md-list-item-bottom-space: 0;
  --one-line-container-height: 3.5rem;
  --mark-color: var(--md-sys-color-surface-container);
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

md-list {
  padding: 0;
  border-bottom: 0.0625rem solid var(--mark-color);
}

md-list-item:not(:last-child) {
  border-bottom: 0.125rem solid var(--mark-color);
}

[slot=start] {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--one-line-container-height);
  cursor: pointer;
}
[slot=start] > * {
  margin-right: 1rem;
}

[slot=end] {
  position: relative;
  flex: none;
  padding: 0.125rem;
}
[slot=end]::before {
  content: "";
  display: block;
  position: absolute;
  inset: 0;
  background-color: var(--md-sys-color-on-surface, #1d1b20);
  opacity: 0.08;
  border-radius: 0.125rem;
}`;
