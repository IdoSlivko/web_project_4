import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitHandler }) {
    super(popupSelector);

    this._submitHandler = submitHandler;
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._submitButton = this._popupElement.querySelector(".popup__submit");
    this._submitButton.value = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputsList = Array.from(this._formElement.querySelectorAll(".popup__input"));
    const inputValues = {};
    
    inputsList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
 
    return inputValues;
  }

  renderProgress(result) {
    if (result) {
      this._submitButton.textContent = "Saving...";
    }
    else {
      this._submitButton.textContent = this._submitButton.value;
    }
  }

  close() {
    super.close();

    this._formElement.reset();
  }

  _submitThisForm = () => {
    this.renderProgress(true);
    this._submitHandler(this._getInputValues());
    this._formElement.reset();
    this.close();
  }

  setEventListeners() {
    this._formElement.addEventListener("submit", this._submitThisForm);
  }
}