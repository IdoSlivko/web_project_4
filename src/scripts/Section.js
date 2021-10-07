export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._arrayOfItems = Array.from(items);
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  renderer() {
    this._arrayOfItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}