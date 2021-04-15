export class AbstractStore {
  constructor() {
    this._items = {};
  }

  add(item) {
    this._items[item.id] = item;

    return item;
  }

  find(id) {
    return this._items[id];
  }

  serialize() {
    return Object.values(this._items).map(i => i.serialize());
  }
}
