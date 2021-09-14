const editBtn = document.querySelector(".profile__edit-profile");
const addImgBtn = document.querySelector(".profile__add-photo");

const popup = document.querySelectorAll(".popup");

const popupProfileDisplay = document.querySelector(".popup_profile");
const popupImageDisplay = document.querySelector(".popup_add-image");
const popupLargeImageDisplay = document.querySelector(".popup_large-image");

const formProfile = document.querySelector(".popup__profile-form");
const formImage = document.querySelector(".popup__add-image-form");

const closeProfileBtn = formProfile.querySelector(".popup__close-profile");
const closeImageBtn = formImage.querySelector(".popup__close-add-image");
const closeLargeImageBtn = document.querySelector(".popup__close-large-image");

const popProfileTitle = formProfile.querySelector(".popup__profile-title");
const popImageTitle = formImage.querySelector(".popup__add-image-title");

const userNameInput = formProfile.querySelector(".popup__input_content_full-name");
const userAboutInput = formProfile.querySelector(".popup__input_content_about");

const newImage = {};
const imageTitleInput = formImage.querySelector( ".popup__input_content_add-image-title");
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
const imageTemplate = document.querySelector("#image-template").content;

function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
  document.addEventListener("keydown", closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
  clearValidationErrors(popup);
}

function closeByEsc(evt) {
  const openedPopup = document.querySelector(".popup_opened");
  if (evt.keyCode === 27) {
    closePopup(openedPopup);
  }
}

function editProfile(popup) {
  openPopup(popup);

  userNameInput.value = name.textContent;
  userAboutInput.value = about.textContent;

  enableValidation();
}

function handleProfileSubmit() {
  name.textContent = userNameInput.value;
  about.textContent = userAboutInput.value;

  closePopup(popupProfileDisplay);
}

function editImage(popup) {
  openPopup(popup);

  formImage.reset();

  enableValidation();
}

function handleImageSubmit() {
  newImage.name = imageTitleInput.value;
  newImage.link = imageLinkInput.value;
  elementsContainer.prepend(renderImg(newImage));

  closePopup(popupImageDisplay);
}

function toggleImgLikeBtn(evt) {
  evt.target.classList.toggle("elements__like-button_active");
}

function renderImg(item) {
  let imageItem = imageTemplate.querySelector(".elements__item").cloneNode(true);
  const imageItemImg = imageItem.querySelector(".elements__image");

  imageItem.querySelector(".elements__title").textContent = item.name;
  imageItemImg.src = item.link;
  imageItemImg.alt = item.name;

  imageItem.querySelector(".elements__delete-button").addEventListener("click", () => {
      imageItem.remove();
      imageItem = null;
    });

  imageItem.querySelector(".elements__like-button").addEventListener("click", toggleImgLikeBtn);

  imageItemImg.addEventListener("click", () => {
    openPopup(popupLargeImageDisplay);
    document.querySelector(".popup__image").src = item.link;
    document.querySelector(".popup__caption").textContent = item.name;
    document.querySelector(".popup__image").alt = item.name;
  });

  return imageItem;
}

initialCards.forEach((item) => {
  elementsContainer.prepend(renderImg(item));
});

editBtn.addEventListener("click", () => {
  editProfile(popupProfileDisplay);
});

closeProfileBtn.addEventListener("click", () => {
  closePopup(popupProfileDisplay);
});

formProfile.addEventListener("submit", handleProfileSubmit);

addImgBtn.addEventListener("click", () => {
  editImage(popupImageDisplay);
});

closeImageBtn.addEventListener("click", () => {
  closePopup(popupImageDisplay);
});

formImage.addEventListener("submit", handleImageSubmit);

closeLargeImageBtn.addEventListener("click", () => {
  closePopup(popupLargeImageDisplay);
  document.removeEventListener("keydown", closeByEsc);
});