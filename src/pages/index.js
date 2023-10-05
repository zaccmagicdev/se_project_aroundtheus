//importing what we need
import {
    editButton,
    addImageButton,
    profileEditForm,
    addImageEditForm,
    editAvatarForm,
    profileEditNameInput,
    profileEditJobInput,
    editAvatarButton,
    avatarPicture,
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

//loading user data
api.getCardsAndUserData().then((res) => {
    res[0].forEach((card) => {
        const newCard = createCard({
            name: card.name,
            link: card.link,
            id: card._id,
            likeStatus: card.isLiked
        })
        cardList.addItem(newCard);
    })

    const { avatar, about, name } = res[1];
    avatarPicture.src = avatar;
    userInfo.setUserInfo({name, about});
})

//modal related code and i callbacks
const userInfo = new UserInfo('#user-name', '#user-career');

const enlargeImageModal = new PopUpWithImage('#enlarged-modal-box');

const confirmationModal = new PopUpWithConfirmation('#confirm-modal', (data) => {
    removeCard(data, data._id);
    confirmationModal.close();
});

const editAvatarModal = new PopUpWithForm('#avatar-edit-modal', (data) => {
    editAvatarModal.renderLoading(true);
    api.updateProfilePic(data["avatar-link"])
    .then(res => avatarPicture.src = res.avatar)
    .then(editAvatarModal.renderLoading(false))
    .finally(editAvatarModal.close())
    //we will also intermittnely add a method call here for the 'Saving', same will go for uploading cards
});

const addImageModal = new PopUpWithForm("#add-modal-box", (data) => {
    addImageModal.renderLoading(true);
    api.uploadCard(data["add-img-title"], data["add-img-link"])
        .then((res) => {
            const { name, link, _id, isLiked } = res
            cardList.prependItem(createCard({
                name: name,
                link: link,
                id: _id,
                likeStatus: isLiked
            }))
        })
        .then(addImageModal.renderLoading(false))
        .finally(addImageModal.close())
});

const editProfileModal = new PopUpWithForm("#profile-modal-box", (data) => {
    editAvatarModal.renderLoading(true);
    api.setProfileData
    (data["profile-modal-username"], data["profile-modal-desc"])
    .then(res => userInfo.setUserInfo(res))
    .then(addImageModal.renderLoading(false))
    .finally(editProfileModal.close())
});

editProfileModal.setEventListeners();
addImageModal.setEventListeners();
enlargeImageModal.setEventListeners();
confirmationModal.setEventListeners();
editAvatarModal.setEventListeners();

//functions
function createCard(item) {
    const card = new Card(item, "#card-template", 
    () => {enlargeImageModal.open(item.name, item.link)}, 
    () => { confirmationModal.open(card, card._id) },
    () => {
        if (!item.likeStatus) {
            api.likeCard(item.id).then(res => {
                updateCardData(item, res.isLiked);
            })
        } else {
            api.unlikeCard(item.id).then(res => {
                updateCardData(item, res.isLiked);
            })
            }
    });

    const cardElement = card.generateCard();
    return cardElement;
}

function updateCardData(item, newItemData) {
    item.likeStatus = newItemData;
}

function removeCard(cardElement, cardId) {
    api.deleteCard(cardId)
        .then(
            cardElement.delete()
        )
        .catch(err => console.log(err))
}

//card rendering section and rendering
const cardList = new Section({
    items: [],
    renderer: () => { }
}, '.cards');

cardList.renderItems();

//enabling form validation
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
