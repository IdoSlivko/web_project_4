const formsSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  errorMessageSelector: ".popup__input-error-msg",
  submitButtonInactiveClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_type_error",
  errorMessageClass: "popup__input-error-msg",
  errorMessageClassActive: "popup__input-error-msg_active",
};

function clearValidationErrors(popup, formsSettings) {
  const popupInputs = popup.querySelectorAll(formsSettings.inputSelector);
  const popupErrors = popup.querySelectorAll(formsSettings.errorMessageSelector);

  popupInputs.forEach((input) => input.classList.remove(formsSettings.inputErrorClass));

  popupErrors.forEach((error) => {
    error.classList.remove(formsSettings.errorMessageClassActive);
    error.textContent = "";
  });
}

function showInputError(formElement, inputElement, errorMessage, formsSettings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(formsSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formsSettings.errorMessageClassActive);
}

function hideInputError(formElement, inputElement, formsSettings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(formsSettings.inputErrorClass);
  errorElement.classList.remove(formsSettings.errorMessageClassActive);
  errorElement.textContent = "";
}

function checkInputsValidity(formElement, inputElement, formsSettings) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formsSettings);
  } else {
    hideInputError(formElement, inputElement, formsSettings);
  }
}

function checkFormInvalidity(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleSubmitState(inputList, submitButton, formsSettings) {
  if (checkFormInvalidity(inputList)) {
    submitButton.classList.add(formsSettings.submitButtonInactiveClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(formsSettings.submitButtonInactiveClass);
    submitButton.disabled = false;
  }
}

function setFormState(formElement, formsSettings) {
  const inputList = Array.from(formElement.querySelectorAll(formsSettings.inputSelector));
  const submitButton = formElement.querySelector(formsSettings.submitButtonSelector);

  toggleSubmitState(inputList, submitButton, formsSettings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputsValidity(formElement, inputElement, formsSettings);
      toggleSubmitState(inputList, submitButton, formsSettings);
    });
  });
}

function enableValidation(formsSettings) {
  const formList = Array.from(document.querySelectorAll(formsSettings.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setFormState(formElement, formsSettings);
  });
}

enableValidation(formsSettings);