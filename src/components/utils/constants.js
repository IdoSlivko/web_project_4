export const editProfileBtn = document.querySelector(".profile__edit-profile");
export const editProfileImageBtn = document.querySelector(".profile__edit-image");
export const addImageBtn = document.querySelector(".profile__add-photo");

const form = document.querySelector(".popup__form");
const formImageProfile = document.querySelector(".popup__edit-profile-image-form");

export const userNameInput = form.querySelector(".popup__input_content_full-name");
export const userAboutInput = form.querySelector(".popup__input_content_about");
export const userProfileImageInput = formImageProfile.querySelector(".popup__input_content_edit-profile-image-link");

export const formsSettings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  errorMessageSelector: ".popup__input-error-msg",
  submitButtonInactiveClass: "popup__submit_inactive",
  inputErrorClass: "popup__input_type_error",
  errorMessageClass: "popup__input-error-msg",
  errorMessageClassActive: "popup__input-error-msg_active",
};

export const profileFormElement = document.querySelector(".popup__profile-form");
export const profileImageFormElement = document.querySelector(".popup__edit-profile-image-form");
export const imageFormElement = document.querySelector(".popup__add-image-form");