//importing what we need
import {
    initialCards,
    editButton,
    addImageButton,
    profileEditForm,
    addImageEditForm,
    editAvatarForm,
    profileEditNameInput,
    profileEditJobInput,
    editAvatarButton,
    avatarPicture,
    avatarJob,
    avatarName
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
        authorization: 'a087da59-6aa1-4dbf-8a2c-982e97da6080',
        'Content-Type': 'application/json',
    },
});



//testing out our requests
function setProfilePicture(){
    api.getUserData().then(res => avatarPicture.src = res.avatar);
}

function setProfile(){
    api.getUserData().then((res) => {
        avatarJob.textContent = res.about;
        avatarName.textContent = res.name;
    });
}

//saving data
setProfilePicture();
setProfile();

//modal related code
const userInfo = new UserInfo('#user-name', '#user-career');
const enlargeImageModal = new PopUpWithImage('#enlarged-modal-box');
const confirmationModal = new Popup('#confirm-modal');
const editAvatarModal = new PopUpWithForm('#avatar-edit-modal', (data) =>{
    api.updateProfilePic(data["avatar-link"]);
    setProfilePicture();
    editAvatarModal.close();
    //we will also intermittnely add a method call here for the 'Saving', same will go for uploading cards
});

api.getInitialCards().then((res) => res.forEach((card) => {
    cardList.prependItem(createCard({
        name: card.name,
        link: card.link
    }))
}));

const addImageModal = new PopUpWithForm("#add-modal-box", (data) => {
    api.uploadCard(data["add-img-title"], data["add-img-link"])
    .then(cardList.prependItem(createCard({
        name: data["add-img-title"],
        link: data["add-img-link"]
    })));
    addImageModal.close();
});

const editProfileModal = new PopUpWithForm("#profile-modal-box", (data) => {
    api.setProfileData
    (data["profile-modal-username"], data["profile-modal-desc"]);
    setProfile();
    editProfileModal.close(); 
});

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

//FOR RENDERING CARDS: we will take whatever from the array of cards we get, use that array as it's card count, have link and name come from the server side cards that we uploaded
    //we will need to find a way for the loaded cards to be accessed through out the entire program

const cardList = new Section({
    items: [],
    renderer: () => {}
}, '.cards');

cardList.renderItems();

const addFormValidator = new FormValidator(formConfig, addImageEditForm);
const editFormValidator = new FormValidator(formConfig, profileEditForm);
const avatarFormValidator = new FormValidator(formConfig, editAvatarForm);

addFormValidator.enableValidation();
editFormValidator.enableValidation();
avatarFormValidator.enableValidation();

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

editAvatarButton.addEventListener("click", () => {
    editAvatarModal.open();
});
