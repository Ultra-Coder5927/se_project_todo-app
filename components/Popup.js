export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__close");
  }

  open() {
    this._popup.classList.add("popup_visible");
    this._popup.addEventListener("click", this._handleClickOutside);
  }

  close() {
    this._popup.classList.remove("popup_visible");
    this._popup.removeEventListener("click", this._handleClickOutside);
  }

  _handleEscapeClose = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  };

  _handleClickOutside = (event) => {
    if (event.target === this._popup) {
      this.close();
    }
  };

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });

    document.addEventListener("keydown", this._handleEscapeClose);
  }
}
