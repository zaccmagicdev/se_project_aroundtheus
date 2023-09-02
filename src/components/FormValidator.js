//this is gonna be our object to pass inputs through for validation

export default class FormValidator {
    constructor(settings, form) {
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;

        this._form = form;
    }

    _showInputError(inputElement) {
        const inputErrorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputErrorElement.textContent = inputElement.validationMessage;
        inputErrorElement.classList.add(this._errorClass);
        inputElement.classList.add(this._inputErrorClass);
    }

    _hideInputError(inputElement) {
        const inputErrorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputErrorElement.textContent = "";
        inputErrorElement.classList.remove(this._errorClass);
        inputElement.classList.remove(this._inputErrorClass);
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput(inputList) {
        return !inputList.every((input) => input.validity.valid);
    }

    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', true);
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled', true);
        }
    }

    _setEventListeners() {
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._buttonElement = this._form.querySelector(this._submitButtonSelector);
        this._toggleButtonState();

        this._inputList.forEach((input) => {
            input.addEventListener("input", (e) => {
                e.preventDefault();
                this._checkInputValidity(input);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._form.addEventListener("submit", (e) => {
            e.preventDefault;
        });
        this._setEventListeners();
    }
}
