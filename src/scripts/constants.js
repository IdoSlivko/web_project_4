export const editProfileBtn = document.querySelector(".profile__edit-profile");
export const addImageBtn = document.querySelector(".profile__add-photo");

const formProfile = document.querySelector(".popup__profile-form");
export const formImage = document.querySelector(".popup__add-image-form");

export const popProfileSubmit = formProfile.querySelector(".popup__profile-submit");
export const popImageSubmit = formImage.querySelector(".popup__add-image-submit");

export const userNameInput = formProfile.querySelector(".popup__input_content_full-name");
export const userAboutInput = formProfile.querySelector(".popup__input_content_about");

export const name = document.querySelector(".profile__name");
export const about = document.querySelector(".profile__occupation");

export const initialCards = [
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

export const profileFormElement = document.querySelector(".popup__profile-form");
export const imageFormElement = document.querySelector(".popup__add-image-form");