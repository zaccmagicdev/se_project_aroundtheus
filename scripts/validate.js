const config = ({
    modalBackground: ".modal",
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_error",
    errorClass: "modal__input_error_visible"
});

const showInputError = (formElement, inputElement, { errorClass }) => {
    const inputErrorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputErrorElement.textContent = inputElement.validationMessage;
    inputErrorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, { errorClass }) => {
    const inputErrorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputErrorElement.textContent = "";
    inputErrorElement.classList.remove(errorClass);
};

const checkInputValidity = (formElement, inputElement, options) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, options);
    } else {
        hideInputError(formElement, inputElement, options);
    }
};

function hasValidInput(inputList) {
    return !inputList.every((input) => input.validity.valid);
};

const toggleButtonState = (inputElements, submitButton, { inactiveButtonClass }) => {
    if (hasValidInput(inputElements)) {
        submitButton.classList.add(inactiveButtonClass);
    } else {
        submitButton.classList.remove(inactiveButtonClass);
    }
};

function setEventListeners(formElement, options) {
    const { inputSelector } = options;
    const inputElements = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButton = formElement.querySelector(".modal__button");
    toggleButtonState(inputElements, submitButton, options);

    inputElements.forEach((input) => {
        input.addEventListener("input", (e) => {
            e.preventDefault();
            checkInputValidity(formElement, input, options);
            toggleButtonState(inputElements, submitButton, options);
        });
    });
}

function enableValidation(options) {
    const forms = Array.from(document.querySelectorAll(options.formSelector));
    const backgrounds = Array.from(document.querySelectorAll(options.modalBackground));
    forms.forEach((form) => {
        form.addEventListener("submit", (e) => {
            e.preventDefault;
        });
        setEventListeners(form, options);
    });
    backgrounds.forEach((background => {
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                closeModal(background);
            }
        });

        background.addEventListener("click", (e) => {
            closeModal(e.target);
        });
    }));
}

enableValidation(config);
