import { popupLargeImageDisplay, openPopup } from "./utilities.js";

const image = document.querySelector(".popup__image");
const imageCaption = document.querySelector(".popup__caption");

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  _getCardTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);

    return cardTemplate;
  }

  _enlargeCard() {
    openPopup(popupLargeImageDisplay);
    image.src = this._link;
    imageCaption.textContent = this._name;
    image.alt = this._name;
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
    this._item
      .querySelector(".elements__image")
      .addEventListener("click", () => this._enlargeCard());
    this._item
      .querySelector(".elements__like-button")
      .addEventListener("click", () => this._toggleLikeCard());
    this._item
      .querySelector(".elements__delete-button")
      .addEventListener("click", () => this._deleteCard());
  }

  generateCard() {
    this._item = this._getCardTemplate();
    this._setEventListeners();

    this._item.querySelector(".elements__title").textContent = this._name;
    this._item.querySelector(".elements__image").src = this._link;
    this._item.querySelector(".elements__image").alt = this._name;

    return this._item;
  }
}