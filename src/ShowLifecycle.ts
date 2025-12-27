import {LitElement, type PropertyValues} from 'lit';

export class ShowLifecycle extends LitElement {
  override shouldUpdate(updated: PropertyValues) {
    console.log('should update', ...updated.keys(), this);
    return super.shouldUpdate(updated);
  }
  override willUpdate(updated: PropertyValues) {
    console.log('will update', ...updated.keys(), this);
    super.willUpdate(updated);
  }
  override update(updated: PropertyValues) {
    console.log('update', ...updated.keys(), this);
    super.update(updated);
  }
  override updated(changes: PropertyValues) {
    console.log('updated', ...changes.keys(), this);
  }
}
