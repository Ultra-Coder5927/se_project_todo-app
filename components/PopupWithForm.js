import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._handleFormSubmit = submit;
    this._formElement = this._popup.querySelector(".popup__form");
    this._inputEls = this._formElement.querySelectorAll("input");
  }

  _getInputValues() {
    const inputValues = {};
    this._inputEls.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (!this._formElement.checkValidity()) {
        return;
      }
      this._handleFormSubmit(this._getInputValues());
      this._formElement.reset();
    });
  }
}
