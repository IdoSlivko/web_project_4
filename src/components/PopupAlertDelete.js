import Popup from "./Popup.js";

export default class PopupAlertDelete extends Popup {
	constructor(popupSelector) {
    super(popupSelector);
		
		this._formElement = this._popupElement.querySelector(".popup__form");
  }

  submitRequest(serverResponse) {
		this._initiateSubmit = serverResponse;
	}

	setEventListeners() {
    this._formElement.addEventListener("submit", (evt) => {
			evt.preventDefault();
			this._initiateSubmit();
			this.close();
		});
  }
}