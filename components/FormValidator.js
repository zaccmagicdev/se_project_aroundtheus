//this is gonna be our object to pass inputs through for validation

export default class FormValidator {
    constructor(settings, form) {
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.errorClass;
        this._errorClass = settings.errorClass;

        this._form = form;
    }

    _showInputError(inputElement) {
        const inputErrorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputErrorElement.textContent = inputElement.validationMessage;
        inputErrorElement.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const inputErrorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputErrorElement.textContent = "";
        inputErrorElement.classList.remove(this._errorClass);
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasValidInput(inputList) {
        return !inputList.every((input) => input.validity.valid);
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasValidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.setAttribute('disabled', true);
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.removeAttribute('disabled', true);
        }
    }

    _setEventListeners() {
        const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        const submitButton = this._form.querySelector(this._submitButtonSelector);
        this._toggleButtonState(inputList, submitButton);

        inputList.forEach((input) => {
            input.addEventListener("input", (e) => {
                e.preventDefault();
                this._checkInputValidity(input);
                this._toggleButtonState(inputList, submitButton);
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