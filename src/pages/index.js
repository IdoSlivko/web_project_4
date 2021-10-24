import "./index.css";

import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupAlertDelete from "../components/PopupAlertDelete.js";
import Api from "../components/Api.js"

import {
  formsSettings,
  editProfileBtn,
  editProfileImageBtn,
  addImageBtn,
  userNameInput,
  userAboutInput,
  profileFormElement,
  profileImageFormElement,
  imageFormElement,
} from "../utils/constants.js";

const edidProfileformValidator = new FormValidator(formsSettings, profileFormElement);
const edidProfileImageformValidator = new FormValidator(formsSettings, profileImageFormElement);
const addImageformValidator = new FormValidator(formsSettings, imageFormElement);

edidProfileformValidator.enableValidation();
edidProfileImageformValidator.enableValidation();
addImageformValidator.enableValidation();

let userID;
let server;


const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "f21cbaab-48ba-469f-bdb9-c2956aed6b6b",
    "Content-Type": "application/json"
  }
});

api.getProfileInfo()
.then((res) => {
  userInfo.setUserInfo(res);
  userID = res._id;

  api.getServerImages()
  .then((res) => {
    server = new Section(".elements",
      {
        items: res,
        renderer: (imageItem) => {
          server.addItem(generateCardWithImage(imageItem));
        } 
    });
    server.constructItems();
  })
  .catch((error) => console.log("Error from getServerImages:", error));
})
.catch((error) => console.log("Error from getProfileInfo:", error));

const deleteCardAlert = new PopupAlertDelete(".popup_alert-delete");
deleteCardAlert.setEventListeners();

const largeImagePopup = new PopupWithImage(".popup_large-image");

function openLargeImagePopup(name, link) {
  largeImagePopup.open(name, link);
}

function generateCardWithImage(imageObject) {
  const imageElement = new Card(userID, imageObject, "#image-template", {
    handleCardClick: openLargeImagePopup,
    handleAddLike: (id) => {
      api.likeCard(id)
        .then((res) => {
          imageElement.toggleLike(res.likes.length);
        })
        .catch((error) => console.log("Error from likeCard:", error));
    },
    handleRemoveLike: (id) => {
      api.unLikeCard(id)
        .then((res) => {
          imageElement.toggleLike(res.likes.length);
        })
        .catch((error) => console.log("Error from unLikeCard:", error));
    },
    handleBinClick: (id) => {
      deleteCardAlert.open();
      deleteCardAlert.submitRequest(() => {
        api.deleteImage(id)
         .then((res) => {
           imageElement.deleteCard();
           deleteCardAlert.close();
         })
         .catch((error) => console.log("Error from deleteImage:", error));
      });
    },
  });
  return imageElement.generateCard();
}

const initiateImagePopup = new PopupWithForm(".popup_add-image",
{
  submitHandler: (imageData) => {
    api.addNewImage(imageData)
    .then((res) => {
      server.addItem(generateCardWithImage(res));
      initiateImagePopup.close();
    })
    .catch((error) => console.log("Error from addNewImage:", error))
    .finally(() => initiateImagePopup.renderProgress(false));
  }
});

const initiateProfileImagePopup = new PopupWithForm(".popup_edit-profile-image",
{
  submitHandler: (link) => {
    api.editProfileImage(link)
    .then((res) => {
      userInfo.setUserInfo(res);
      initiateProfileImagePopup.close();
    })
    .catch((error) => console.log("Error from editProfileImage:", error))
    .finally(() => initiateProfileImagePopup.renderProgress(false));
  }
});

initiateProfileImagePopup.setEventListeners();

editProfileImageBtn.addEventListener("click", () => {
  edidProfileImageformValidator.clearValidationErrors();
  edidProfileImageformValidator.toggleSubmitState();

  initiateProfileImagePopup.open();
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
  userImageSelector: ".profile__image"
});

const initiateProfilePopup = new PopupWithForm(".popup_profile", {
  submitHandler: (userInputs) => {
    api.setProfileInfo(userInputs)
    .then((res) => {
      userInfo.setUserInfo(res);
      initiateProfilePopup.close();
    })
    .catch((error) => console.log("Error from setProfileInfo:", error))
    .finally(() => initiateProfilePopup.renderProgress(false));
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