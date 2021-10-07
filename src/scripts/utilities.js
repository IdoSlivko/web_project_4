export const formsSettings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  errorMessageSelector: ".popup__input-error-msg",
  submitButtonInactiveClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_type_error",
  errorMessageClass: "popup__input-error-msg",
  errorMessageClassActive: "popup__input-error-msg_active",
};

export function clearValidationErrors(popup, formsSettings) {
  const popupInputs = popup.querySelectorAll(formsSettings.inputSelector);
  const popupErrors = popup.querySelectorAll(formsSettings.errorMessageSelector);

  popupInputs.forEach((input) => input.classList.remove(formsSettings.inputErrorClass));

  popupErrors.forEach((error) => {
    error.classList.remove(formsSettings.errorMessageClassActive);
    error.textContent = "";
  });
}