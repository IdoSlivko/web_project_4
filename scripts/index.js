import { popupLargeImageDisplay, openPopup, closePopup, formsSettings } from "./utilities.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const editProfileBtn = document.querySelector(".profile__edit-profile");
const addImageBtn = document.querySelector(".profile__add-photo");

const popupProfileDisplay = document.querySelector(".popup_profile");
const popupImageDisplay = document.querySelector(".popup_add-image");

const formProfile = document.querySelector(".popup__profile-form");
const formImage = document.querySelector(".popup__add-image-form");

const closeProfileBtn = formProfile.querySelector(".popup__close-profile");
const closeImageBtn = formImage.querySelector(".popup__close-add-image");
const closeLargeImageBtn = document.querySelector(".popup__close-large-image");

const userNameInput = formProfile.querySelector(".popup__input_content_full-name");
const userAboutInput = formProfile.querySelector(".popup__input_content_about");

const imageTitleInput = formImage.querySelector(".popup__input_content_add-image-title");
const imageLinkInput = formImage.querySelector(".popup__input_content_add-image-link");

const popProfileSubmit = formProfile.querySelector(".popup__profile-submit");
const popImageSubmit = formImage.querySelector(".popup__add-image-submit");

const name = document.querySelector(".profile__name");
name.textContent = "Jacques Cousteau";

const about = document.querySelector(".profile__occupation");
about.textContent = "Explorer";

const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
  {
    name: "but most of all, samy is my hero",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
];

const elementsContainer = document.querySelector(".elements");

const profileFormElement = document.querySelector(".popup__profile-form");
const imageFormElement = document.querySelector(".popup__add-image-form");

const edidProfileformValidator = new FormValidator(formsSettings, profileFormElement);
const addImageformValidator = new FormValidator(formsSettings, imageFormElement);

edidProfileformValidator.enableValidation();
addImageformValidator.enableValidation();

initialCards.forEach((card) => {
  const img = new Card(card, "#image-template");
  const imgElement = img.generateCard();

  elementsContainer.prepend(imgElement);
});

function editProfile(popup) {
  openPopup(popup);

  userNameInput.value = name.textContent;
  userAboutInput.value = about.textContent;

  popProfileSubmit.disabled = false;
  popProfileSubmit.classList.remove("popup__submit_inactive");
}

function handleProfileSubmit() {
  name.textContent = userNameInput.value;
  about.textContent = userAboutInput.value;

  closePopup(popupProfileDisplay);
}

function editImage(popup) {
  openPopup(popup);

  formImage.reset();

  popImageSubmit.disabled = true;
  popImageSubmit.classList.add("popup__submit_inactive");
}

function handleImageSubmit() {
  const newImage = {
    name: imageTitleInput.value,
    link: imageLinkInput.value,
  };

  const newObjImg = new Card(newImage, "#image-template");
  const newImgElement = newObjImg.generateCard();

  elementsContainer.prepend(newImgElement);

  closePopup(popupImageDisplay);
}

editProfileBtn.addEventListener("click", () => {
  editProfile(popupProfileDisplay);
});

closeProfileBtn.addEventListener("click", () => {
  closePopup(popupProfileDisplay);
});

formProfile.addEventListener("submit", handleProfileSubmit);

addImageBtn.addEventListener("click", () => {
  editImage(popupImageDisplay);
});

closeImageBtn.addEventListener("click", () => {
  closePopup(popupImageDisplay);
});

formImage.addEventListener("submit", handleImageSubmit);

closeLargeImageBtn.addEventListener("click", () => {
  closePopup(popupLargeImageDisplay);
});