export const initialCards = [{
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
}, {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
}, {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
}, {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
}, {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
}, {
    name: "Lago di Braise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
}];

export const formConfig = ({
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__input_error_visible"
});

export const editButton = document.querySelector('#edit-button');
export const addImageButton = document.querySelector('.profile__add-button');
export const profileEditForm = document.querySelector('#profile__modal-form');
export const addImageEditForm = document.querySelector('#add-image__modal-form');
export const profileEditNameInput = document.querySelector('#profile-modal__input-name');
export const profileEditJobInput = document.querySelector('#profile-modal__input-description');
export const editAvatarButton = document.querySelector('.profile__avatar-button');
export const avatarPicture = document.querySelector('.profile__avatar');
