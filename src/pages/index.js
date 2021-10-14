import "./index.css";

import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

import {
  formsSettings,
  editProfileBtn,
  addImageBtn,
  userNameInput,
  userAboutInput,
  name,
  about,
  initialCards,
  profileFormElement,
  imageFormElement,
} from "../components/utils/constants.js";

name.textContent = "Jacques Cousteau";
about.textContent = "Explorer";

const edidProfileformValidator = new FormValidator(formsSettings, profileFormElement);
const addImageformValidator = new FormValidator(formsSettings, imageFormElement);

edidProfileformValidator.enableValidation();
addImageformValidator.enableValidation();

const largeImagePopup = new PopupWithImage(".popup_large-image");

function openLargeImagePopup(name, link) {
  largeImagePopup.open(name, link);
}

function generateCardWithImage(imageObject) {
  const imageElement = new Card(imageObject, "#image-template", {
    handleCardClick: openLargeImagePopup,
  });
  return imageElement.generateCard();
}

const imagesGenerator = new Section(".elements",
  {
    items: initialCards,
    renderer: (imageItem) => {
      imagesGenerator.addItem(generateCardWithImage(imageItem));
    },
  }
);

imagesGenerator.renderer();

const initiateImagePopup = new PopupWithForm(".popup_add-image",
  {
    submitHandler: (imageData) => {
      const newImageData = {
        name: imageData.imageTitle,
        link: imageData.imageLink,
      };
    imagesGenerator.addItem(generateCardWithImage(newImageData));
  },
});

initiateImagePopup.setEventListeners();

addImageBtn.addEventListener("click", () => {
  addImageformValidator.clearValidationErrors();
  addImageformValidator.toggleSubmitState();
  initiateImagePopup.open();
});

const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userAboutSelector: ".profile__occupation",
});

const initiateProfilePopup = new PopupWithForm(".popup_profile", {
  submitHandler: (userData) => {
    userInfo.setUserInfo(userData);
  },
});

initiateProfilePopup.setEventListeners();

editProfileBtn.addEventListener("click", () => {
  const currentInfo = userInfo.getUserInfo();
  userNameInput.value = currentInfo.name;
  userAboutInput.value = currentInfo.about;

  edidProfileformValidator.clearValidationErrors();
  edidProfileformValidator.toggleSubmitState();

  initiateProfilePopup.open();
});