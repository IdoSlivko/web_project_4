import "../pages/index.css";

import { formsSettings } from "./utilities.js";

import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

import {
  editProfileBtn,
  addImageBtn,
  formImage,
  userNameInput,
  userAboutInput,
  popProfileSubmit,
  popImageSubmit,
  name,
  about,
  initialCards,
  profileFormElement,
  imageFormElement,
} from "./constants.js";

name.textContent = "Jacques Cousteau";
about.textContent = "Explorer";

const edidProfileformValidator = new FormValidator(formsSettings, profileFormElement);
const addImageformValidator = new FormValidator(formsSettings, imageFormElement);

edidProfileformValidator.enableValidation();
addImageformValidator.enableValidation();

function openLargeImagePopup(name, link) {
  const largeImagePopup = new PopupWithImage(".popup_large-image");
  largeImagePopup.setEventListeners();
  largeImagePopup.open(name, link);
}

const imagesGenerator = new Section(
  {
    items: initialCards,
    renderer: (imageItem) => {
      const imageElement = new Card(imageItem, "#image-template", {
        handleCardClick: openLargeImagePopup,
      });
      imagesGenerator.addItem(imageElement.generateCard());
    },
  },
  ".elements"
);

imagesGenerator.renderer();

const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userAboutSelector: ".profile__occupation",
});

const initiateProfilePopup = new PopupWithForm(".popup_profile", {
  submitHandler: (userData) => {
    userInfo.setUserInfo(userData);
  },
});

editProfileBtn.addEventListener("click", () => {
  initiateProfilePopup.setEventListeners();
  initiateProfilePopup.open();

  const currentInfo = userInfo.getUserInfo();
  userNameInput.value = currentInfo.name;
  userAboutInput.value = currentInfo.about;

  popProfileSubmit.disabled = false;
  popProfileSubmit.classList.remove("popup__submit_inactive");
});

const initiateImagePopup = new PopupWithForm(".popup_add-image", {
  submitHandler: (imageData) => {
    const newImageData = {
      name: imageData.imageTitle,
      link: imageData.imageLink,
    };

    const newImageElement = new Card(newImageData, "#image-template", {
      handleCardClick: openLargeImagePopup,
    });
    imagesGenerator.addItem(newImageElement.generateCard());
  },
});

initiateImagePopup.setEventListeners();

addImageBtn.addEventListener("click", () => {
  initiateImagePopup.open();
  
  formImage.reset();

  popImageSubmit.disabled = true;
  popImageSubmit.classList.add("popup__submit_inactive");
});