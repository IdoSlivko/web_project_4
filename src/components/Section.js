export default class Section {
  constructor(containerSelector, { items, renderer }) {
    this._items = Array.from(items);
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  renderer() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}