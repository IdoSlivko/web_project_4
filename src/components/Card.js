export default class Card {
constructor(userID, data, cardSelector, { handleCardClick, handleBinClick, handleAddLike, handleRemoveLike }) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;

    this._handleCardClick = handleCardClick;
    this._handleBinClick = handleBinClick;
    this._handleAddLike = handleAddLike;
    this._handleRemoveLike = handleRemoveLike;

    this._cardID = data._id;
    this._cardOwnerID = data.owner._id;
    this._likes = data.likes;

    this._userID = userID;
  }

  _getCardTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);

    return cardTemplate;
  }

  generateCard() {
    this._item = this._getCardTemplate();
    this._setEventListeners();

    this._item.querySelector(".elements__image").src = this._link;
    this._item.querySelector(".elements__image").alt = this._name;
    this._item.querySelector(".elements__title").textContent = this._name;
    
    this._item.querySelector(".elements__like-counter").textContent = this._likes.length;

    if (this._cardOwnerID === this._userID) {
      this._item.querySelector(".elements__delete-button").classList.add("elements__delete-button_active");
    }

    const cardIsLiked = this._likes.some((someLike) => { return someLike._id === this._userID });
    if (cardIsLiked) { this.toggleLike(this._likes.length); }

    return this._item;
  }

  toggleLike(likesNumber) {
    this._item.querySelector(".elements__like-button").classList.toggle("elements__like-button_active");
    this._item.querySelector(".elements__like-counter").textContent = likesNumber;
  }

  deleteCard() {
    this._item.remove();
    this._item = null;
  }

  _setEventListeners() {
    this._item.querySelector(".elements__image").addEventListener("click", () => this._handleCardClick(this._name, this._link));
    this._item.querySelector(".elements__delete-button").addEventListener("click", () => this._handleBinClick(this._cardID));
    
    this._item.querySelector(".elements__like-button").addEventListener("click", () => {
      const containsLike = this._item.querySelector(".elements__like-button").classList.contains("elements__like-button_active");
      if ( containsLike )
      {
        this._handleRemoveLike(this._cardID);
      }
      else
      {
        this._handleAddLike(this._cardID);
      }
    });
  }
}