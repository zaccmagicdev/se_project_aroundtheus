//importing what we need
import {
    editButton,
    addImageButton,
    confirmModalButton,
    profileEditForm,
    addImageEditForm,
    editAvatarForm,
    profileEditNameInput,
    profileEditJobInput,
    editAvatarButton,
    avatarPicture,
    avatarJob,
    avatarName,
}
    from "../utils/constants.js";

import { formConfig } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopUpWithImage from "../components/PopUpWithImage.js";
import PopUpWithForm from "../components/PopupWithForm.js";
import PopUpWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import Api from "../components/Api.js";

//tesing the API
const api = new Api({
    url: 'https://around-api.en.tripleten-services.com/v1',
    headers: {
        authorization: 'a087da59-6aa1-4dbf-8a2c-982e97da6080',
        'Content-Type': 'application/json',
    },
});

api.getCardsAndUserData().then((res) => {
    res[0].forEach((card) => {
        cardList.addItem(createCard({
            name: card.name,
            link: card.link,
            id: card._id,
            likes: 0
        }))
    })
    const { avatar, about, name } = res[1];
    avatarPicture.src = avatar;
    avatarJob.textContent = about;
    avatarName.textContent = name;
})

//testing out our requests
function setProfilePicture() {
    api.getUserData().then(res => avatarPicture.src = res.avatar);
}

function setProfile() {
    api.getUserData().then((res) => {
        avatarJob.textContent = res.about;
        avatarName.textContent = res.name;
    });
}

function removeCard(cardElement, cardId) {
    api.deleteCard(cardId)
        .then(
            cardElement.delete()
        ).catch(err => console.log(err))
}

//modal related code
const userInfo = new UserInfo('#user-name', '#user-career');
const enlargeImageModal = new PopUpWithImage('#enlarged-modal-box');
const confirmationModal = new PopUpWithConfirmation('#confirm-modal', (data) => {
    removeCard(data, data._id);
    confirmationModal.close();
});
const editAvatarModal = new PopUpWithForm('#avatar-edit-modal', (data) => {
    editAvatarModal.showPatchStatus();
    api.updateProfilePic(data["avatar-link"]).then(
    setProfilePicture())
    .then(editAvatarModal.removePatchStatus())
    //.finally(editAvatarModal.close())
    //we will also intermittnely add a method call here for the 'Saving', same will go for uploading cards
});

const addImageModal = new PopUpWithForm("#add-modal-box", (data) => {
    api.uploadCard(data["add-img-title"], data["add-img-link"])
        .then(addImageModal.showPatchStatus())
        .then(cardList.prependItem(createCard({
            name: data["add-img-title"],
            link: data["add-img-link"]
        })))
        .then(addImageModal.removePatchStatus())
        .finally(addImageModal.close())
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
    }, () => { confirmationModal.open(card, card._id) },
        (data) => {
            if (data) {
                api.likeCard(item.id)
            } else {
                api.unlikeCard(item.id)
            }
            //if(item.isLiked = true){
                //this command would need to let the card class know what to update based on
            //}
        });

    const cardElement = card.generateCard();
    return cardElement;
}

const cardList = new Section({
    items: [],
    renderer: () => { }
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
