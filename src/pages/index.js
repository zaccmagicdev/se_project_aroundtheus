//importing what we need
import {
    initialCards,
    editButton,
    addImageButton,
    profileEditForm,
    addImageEditForm,
    profileEditNameInput,
    profileEditJobInput
}
    from "../utils/constants.js";

import { formConfig } from "../utils/constants.js";
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
    cardList.prependItem(createCard({
        name: data["add-img-title"],
        link: data["add-img-link"]
    }));
    addImageModal.close();
});

const editProfileModal = new PopUpWithForm("#profile-modal-box", (data) => {
    userInfo.setUserInfo({
        name: data["profile-modal-username"],
        job: data["profile-modal-desc"]
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

const addFormValidator = new FormValidator(formConfig, addImageEditForm);
const editFormValidator = new FormValidator(formConfig, profileEditForm);

addFormValidator.enableValidation();
editFormValidator.enableValidation();

//section for event handlers
editButton.addEventListener("click", () => {
    editProfileModal.open();
    //we can try to put that down here
    profileEditNameInput.value = userInfo.getUserInfo().name;
    profileEditJobInput.value = userInfo.getUserInfo().job;

});

addImageButton.addEventListener("click", () => {
    addImageModal.open();
});
