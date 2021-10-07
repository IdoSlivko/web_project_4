export default class FormValidator {
  constructor(formsSettings, formElement) {
    this._inputSelector = formsSettings.inputSelector;
    this._submitButtonSelector = formsSettings.submitButtonSelector;
    this._submitButtonInactiveClass = formsSettings.submitButtonInactiveClass;
    this._inputErrorClass = formsSettings.inputErrorClass;
    this._errorMessageClassActive = formsSettings.errorMessageClassActive;

    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorMessageClassActive);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorMessageClassActive);
    errorElement.textContent = "";
  }

  _checkInputsValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _checkFormInvalidity(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleSubmitState(inputList, submitButton) {
    if (this._checkFormInvalidity(inputList)) {
      submitButton.classList.add(this._submitButtonInactiveClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(this._submitButtonInactiveClass);
      submitButton.disabled = false;
    }
  }

  _setFormState() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const submitButton = this._formElement.querySelector(this._submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputsValidity(inputElement);
        this._toggleSubmitState(inputList, submitButton);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setFormState();
  }
}