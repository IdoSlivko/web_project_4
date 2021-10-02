export const formsSettings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  errorMessageSelector: ".popup__input-error-msg",
  submitButtonInactiveClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_type_error",
  errorMessageClass: "popup__input-error-msg",
  errorMessageClassActive: "popup__input-error-msg_active",
};

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("click", closeByOverlay);
  document.addEventListener("keydown", closeByEsc);
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("click", closeByOverlay);
  document.removeEventListener("keydown", closeByEsc);
  clearValidationErrors(popup, formsSettings);
}

function clearValidationErrors(popup, formsSettings) {
  const popupInputs = popup.querySelectorAll(formsSettings.inputSelector);
  const popupErrors = popup.querySelectorAll(formsSettings.errorMessageSelector);

  popupInputs.forEach((input) => input.classList.remove(formsSettings.inputErrorClass));

  popupErrors.forEach((error) => {
    error.classList.remove(formsSettings.errorMessageClassActive);
    error.textContent = "";
  });
}

function closeByEsc(evt) {
  const openedPopup = document.querySelector(".popup_opened");

  if (evt.key === "Escape") {
    closePopup(openedPopup);
  }
}

function closeByOverlay(evt) {
  const openedPopup = document.querySelector(".popup_opened");

  if (evt.target === openedPopup) {
    closePopup(openedPopup);
  }
}