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
api.getCardsAndUserData().then(([cards, user]) => {
    cards.forEach((card) => {
        const newCard = createCard({
            name: card.name,
            link: card.link,
            id: card._id,
            isLiked: card.isLiked
        })
        cardList.addItem(newCard);
    })

    const { avatar, about, name } = user;
    userInfo.setUserInfo({ name, about });
    userInfo.setAvatar(avatar);
})
    .catch((err) => console.log(err));

//modal related code and respective callbacks
const userInfo = new UserInfo('#user-name', '#user-career', '.profile__avatar');

const enlargeImageModal = new PopUpWithImage('#enlarged-modal-box');

const confirmationModal = new PopUpWithConfirmation('#confirm-modal');


const editAvatarModal = new PopUpWithForm('#avatar-edit-modal', (data) => {
    editAvatarModal.renderLoading(true);
    api.updateProfilePic(data["avatar-link"])
        .then(res => {
            userInfo.setAvatar(res.avatar);
            editAvatarModal.close();
        })
        .finally(() => editAvatarModal.renderLoading(false))
        .catch((err) => console.log(err));
});

const addImageModal = new PopUpWithForm("#add-modal-box", (data) => {
    addImageModal.renderLoading(true);
    api.uploadCard(data["add-img-title"], data["add-img-link"])
        .then((res) => {
            const { name, link, _id, isLiked } = res;
            cardList.prependItem(createCard({
                name: name,
                link: link,
                id: _id,
                isLiked: isLiked
            }));
            addImageModal.close()
        })
        .finally(() => addImageModal.renderLoading(false))
        .catch((err) => console.log(err));
});

const editProfileModal = new PopUpWithForm("#profile-modal-box", (data) => {
    editProfileModal.renderLoading(true);
    api.setProfileData
        (data["profile-modal-username"], data["profile-modal-desc"])
        .then(res => {
            userInfo.setUserInfo(res);
            editProfileModal.close();
        })
        .finally(() => editProfileModal.renderLoading(false))
        .catch((err) => console.log(err));
});

//functions
function createCard(item) {
    const card = new Card(item, "#card-template",
        () => {
            enlargeImageModal.open(item.name, item.link)
        },
        () => {
            confirmationModal.open();
            confirmationModal.setAction(() => {
                confirmationModal.renderLoading(true);
                api.deleteCard(card._id)
                    .then(() => {
                        card.delete();
                        confirmationModal.close();
                    }).finally(() => confirmationModal.renderLoading(false))
                    .catch((err) => console.log(err));
            })
        },
        () => {
            if (card.isLiked()) {
                api.unlikeCard(card._id)
                    .then(res => card.setIsLiked(res.isLiked))
                    .catch((err) => console.log(err));
            } else {
                api.likeCard(card._id)
                    .then(res => card.setIsLiked(res.isLiked))
                    .catch((err) => console.log(err));
            }
        });

    const cardElement = card.generateCard();
    return cardElement;
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

editProfileModal.setEventListeners();
addImageModal.setEventListeners();
enlargeImageModal.setEventListeners();
confirmationModal.setEventListeners();
editAvatarModal.setEventListeners();
