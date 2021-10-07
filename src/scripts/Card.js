export default class Card {
  constructor(data, cardSelector, { handleCardClick }) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;

    this._handleCardClick = handleCardClick;
  }

  _getCardTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);

    return cardTemplate;
  }

  generateCard() {
    this._item = this._getCardTemplate();
    this._setEventListeners();

    this._item.querySelector(".elements__image").src = this._link;
    this._item.querySelector(".elements__image").alt = this._name;
    this._item.querySelector(".elements__title").textContent = this._name;

    return this._item;
  }

  _toggleLikeCard() {
    this._item
      .querySelector(".elements__like-button")
      .classList.toggle("elements__like-button_active");
  }

  _deleteCard() {
    this._item.remove();
    this._item = null;
  }

  _setEventListeners() {
    this._item.querySelector(".elements__image").addEventListener("click", () => this._handleCardClick(this._name, this._link));
    this._item.querySelector(".elements__like-button").addEventListener("click", () => this._toggleLikeCard());
    this._item.querySelector(".elements__delete-button").addEventListener("click", () => this._deleteCard());
  }
}