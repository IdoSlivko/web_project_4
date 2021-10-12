export default class FormValidator {
  constructor(formsSettings, formElement) {
    this._submitButtonInactiveClass = formsSettings.submitButtonInactiveClass;
    this._inputErrorClass = formsSettings.inputErrorClass;
    this._errorMessageClassActive = formsSettings.errorMessageClassActive;
    this._formElement = formElement;
    this._submitButton = this._formElement.querySelector(formsSettings.submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(formsSettings.inputSelector));
    this._errorList = Array.from(this._formElement.querySelectorAll(formsSettings.errorMessageSelector));
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

  _checkFormInvalidity() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  toggleSubmitState() {
    if (this._checkFormInvalidity()) {
      this._submitButton.classList.add(this._submitButtonInactiveClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._submitButtonInactiveClass);
      this._submitButton.disabled = false;
    }
  }

  _setFormState() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputsValidity(inputElement);
        this.toggleSubmitState();
      });
    });
  }

  clearValidationErrors() {
    this._inputList.forEach((input) => input.classList.remove(this._inputErrorClass));
    this._errorList.forEach((error) => {
      error.classList.remove(this._errorMessageClassActive);
      error.textContent = "";
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => { evt.preventDefault(); });
    this._setFormState();
  }
}