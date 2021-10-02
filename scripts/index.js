import { openPopup, closePopup, formsSettings } from "./utilities.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

import {
  editProfileBtn,
	addImageBtn,
	popupProfileDisplay,
	popupImageDisplay,
	popupLargeImageDisplay,
	formProfile,
	formImage,
	closeProfileBtn,
	closeImageBtn,
	closeLargeImageBtn,
	userNameInput,
	userAboutInput,
	imageTitleInput,
	imageLinkInput,
	image,
	imageCaption,
	popProfileSubmit,
	popImageSubmit,
	name,
	about,
	initialCards,
	elementsContainer,
	profileFormElement,
	imageFormElement
} from "./constants.js";

name.textContent = "Jacques Cousteau";
about.textContent = "Explorer";

const edidProfileformValidator = new FormValidator(formsSettings, profileFormElement);
const addImageformValidator = new FormValidator(formsSettings, imageFormElement);

function openCardPopup(name, link) {
  image.src = link;
  image.alt = name;
  imageCaption.textContent = name;

  openPopup(popupLargeImageDisplay);
}

function createCard(data, cardSelector) {
  const card = new Card(data, cardSelector, { handleCardClick: openCardPopup });
  const cardObject = card.generateCard();

  return cardObject;
}

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

  const cardElement = createCard(newImage, "#image-template");
  elementsContainer.prepend(cardElement);

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

edidProfileformValidator.enableValidation();
addImageformValidator.enableValidation();

initialCards.forEach((card) => {
  const cardElement = createCard(card, "#image-template");
  elementsContainer.prepend(cardElement);
});