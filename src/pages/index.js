//importing what we need
import {
    initialCards,
    editButton,
    addImageButton,
    profileEditForm,
    addImageEditForm,
    profileEditNameInput,
    profileEditJobInput,
    editAvatarButton
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
import Popup from "../components/Popup.js";
import Api from "../components/Api.js";

//tesing the API
const api = new Api({
    url: 'https://around-api.en.tripleten-services.com/v1',
    headers: {
        authorization: 'aa5ef577-8c96-4a77-9378-5d70207e734d',
        'Content-Type': 'application/json',
    }
});

console.log(api.getUserData());

//modal related code
const userInfo = new UserInfo('#user-name', '#user-career');
const enlargeImageModal = new PopUpWithImage('#enlarged-modal-box');
const confirmationModal = new Popup('#confirm-modal');
const editAvatarModal = new PopUpWithForm('#avatar-edit-modal', (data) =>{
    console.log(data);
});
const addImageModal = new PopUpWithForm("#add-modal-box", (data) => {
    cardList.prependItem(createCard({
        name: data["add-img-title"],
        link: data["add-img-link"]
    }));
    addImageModal.close();
});

const editProfileModal = new PopUpWithForm("#profile-modal-box", (data) => {
    userInfo.setUserInfo({
        //name: data["profile-modal-username"],
       //job: data["profile-modal-desc"]
       
    });

    editProfileModal.close();
    
    
});

console.log(api.getInitialCards());

editProfileModal.setEventListeners();
addImageModal.setEventListeners();
enlargeImageModal.setEventListeners();
confirmationModal.setEventListeners();
editAvatarModal.setEventListeners();

//functions
function createCard(item) {
    const card = new Card(item, "#card-template", () => {
        enlargeImageModal.open(item.name, item.link);
    }, () => {confirmationModal.open()});

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
//const avatarFormValidator = new FormValidator(formConfig, confirmationModal);

addFormValidator.enableValidation();
editFormValidator.enableValidation();
//avatarFormValidator.enableValidation();

//section for event handlers
editButton.addEventListener("click", () => {
    editProfileModal.open();
   
    const { name, job } = userInfo.getUserInfo();
    profileEditNameInput.value = name;
    profileEditJobInput.value = job;
});

addImageButton.addEventListener("click", () => {
    addImageModal.open();
});

/*editAvatarButton.addEventListener("click", () => {
    editAvatarModal.open();
});*/
