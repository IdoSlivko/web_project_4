export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    this._popupElement.addEventListener("click", this._handleOverlayClose);
    this._popupElement.querySelector(".popup__close-button").addEventListener("click", this._handleButtonClose);
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this._popupElement.removeEventListener("click", this._handleOverlayClose);
    this._popupElement.querySelector(".popup__close-button").removeEventListener("click", this._handleButtonClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleOverlayClose = (evt) => {
    if (evt.target === this._popupElement) {
      this.close();
    }
  };

  _handleButtonClose = () => {
    this.close();
  };
}