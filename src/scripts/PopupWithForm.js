import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitHandler }) {
    super(popupSelector);

    this._submitHandler = submitHandler;
    this._formElement = this._popupElement.querySelector(".popup__form");
  }

  _getInputValues() {
    const inputsList = Array.from(this._formElement.querySelectorAll(".popup__input"));
    const inputValues = {};

    inputsList.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    this.close();
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener("submit", () => this._submitHandler(this._getInputValues()));
  }
}