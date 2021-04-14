export class AbstractStore {
  constructor() {
    this._items = {};
  }

  find(id) {
    return this._items[id];
  }

  serialize() {
    return Object.values(this._items).map(i => i.serialize());
  }
}
