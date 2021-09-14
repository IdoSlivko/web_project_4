function clearValidationErrors(popup) {
  const popupInputs = popup.querySelectorAll(".popup__input");
  const popupErrors = popup.querySelectorAll(".popup__input-error-msg");

  popupInputs.forEach((input) =>
    input.classList.remove("popup__input_type_error")
  );

  popupErrors.forEach((error) => {
    error.classList.remove("popup__input-error-msg_active");
    error.textContent = "";
  });
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error-msg_active");
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error-msg_active");
  errorElement.textContent = "";
}

function isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleSubmitState(inputList, submitButton) {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add("popup__submit_inactive");
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove("popup__submit_inactive");
    submitButton.disabled = false;
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const submitButton = formElement.querySelector(".popup__submit");

  toggleSubmitState(inputList, submitButton);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleSubmitState(inputList, submitButton);
    });
  });
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

enableValidation();