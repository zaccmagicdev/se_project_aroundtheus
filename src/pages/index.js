import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopUpWithImage from "../components/PopUpWithImage.js";
import PopUpWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

//our initial array
const initialCards = [{
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

//variables we need
const editButton = document.querySelector('#edit-button');
const addImageButton = document.querySelector('.profile__add-button');
const addImageModalBox = document.querySelector('#add-modal-box');
const userNameInput = document.querySelector('#profile-modal__input-name');
const userDescInput = document.querySelector('#profile-modal__input-description');
const userImageTitle = addImageModalBox.querySelector('#add-modal__input-name');
const userImageLink = addImageModalBox.querySelector('#add-modal__input-link');
const profileEditForm = document.querySelector('#profile__modal-form');
const addImageEditForm = document.querySelector('#add-image__modal-form');
const cardListElements = document.querySelector('.cards');

const enlargeImageModal = new PopUpWithImage('#enlarged-modal-box');

const addImageModal = new PopUpWithForm("#add-modal-box", () => {
    const name = userImageTitle.value;
    const link = userImageLink.value;

    const userCard = new Card({name, link}, "#card-template", function(){
        enlargeImageModal.open(name, link);
    });
    
    cardListElements.prepend(userCard.generateCard());
    addImageModal.close();
});

const editProfileModal = new PopUpWithForm("#profile-modal-box", () => {
    const userInfo = new UserInfo(userNameInput.value, userDescInput.value);
    userInfo.setUserInfo();
    editProfileModal.close();
});

editProfileModal.setEventListeners();
addImageModal.setEventListeners();
enlargeImageModal.setEventListeners();

//instantiating our section class to render our card elements
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, "#card-template", () => {
            enlargeImageModal.open(item.name, item.link);
        });
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
    }
}, cardListElements);

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

//other necessities

//section for event handlers
editButton.addEventListener("click", () => {
    editProfileModal.open();
});

addImageButton.addEventListener("click", () => {
    addImageModal.open();
});
