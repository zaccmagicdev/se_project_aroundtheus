//importing what we need
import {
    initialCards,
    editButton,
    addImageButton,
    profileEditForm,
    addImageEditForm
}
    from "../utils/constants.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopUpWithImage from "../components/PopUpWithImage.js";
import PopUpWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

//modal related code
const userInfo = new UserInfo('#user-name', '#user-career');
const enlargeImageModal = new PopUpWithImage('#enlarged-modal-box');

const addImageModal = new PopUpWithForm("#add-modal-box", (data) => {
    const retreivedData = Object.values(data);
    cardList.prependItem(createCard({
        name: retreivedData[0],
        link: retreivedData[1]
    }));
    addImageModal.close();
});

const editProfileModal = new PopUpWithForm("#profile-modal-box", (data) => {
    const retreivedData = Object.values(data);
    userInfo.setUserInfo({
        name: retreivedData[0],
        job: retreivedData[1]
    });

    editProfileModal.close();
});

editProfileModal.setEventListeners();
addImageModal.setEventListeners();
enlargeImageModal.setEventListeners();

//functions
function createCard(item) {
    const card = new Card(item, "#card-template", () => {
        enlargeImageModal.open(item.name, item.link);
    });

    const cardElement = card.generateCard();
    return cardElement;
}

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        cardList.addItem(createCard(item));
    }
}, '.cards');

cardList.renderItems();

//Form validation
const formConfig = ({
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__input_error_visible"
});

const addFormValidator = new FormValidator(formConfig, addImageEditForm);
const editFormValidator = new FormValidator(formConfig, profileEditForm);

addFormValidator.enableValidation();
editFormValidator.enableValidation();

//section for event handlers
editButton.addEventListener("click", () => {
    editProfileModal.open();
});

addImageButton.addEventListener("click", () => {
    addImageModal.open();
});
