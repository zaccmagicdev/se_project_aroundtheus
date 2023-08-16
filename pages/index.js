import Card from "../components/Card.js";
import {openModal, closeModal} from "../utils/utils.js"
import FormValidator from "../components/FormValidator.js";

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
const profileModalBox = document.querySelector('#profile-modal-box');
const addImageModalBox = document.querySelector('#add-modal-box');
const enlargedModalBox = document.querySelector('#enlarged-modal-box');
const modalsByArray = document.querySelectorAll('.modal');
const enlargedModalExitButton = enlargedModalBox.querySelector('.modal__exit-button');
const profileModalExitButton = profileModalBox.querySelector('.modal__exit-button');
const addImageModalExitButton = addImageModalBox.querySelector('.modal__exit-button');
const userName = document.querySelector('#user-name');
const userCareer = document.querySelector('#user-career');
const userNameInput = document.querySelector('#profile-modal__input-name');
const userDescInput = document.querySelector('#profile-modal__input-description');
const userImageTitle = addImageModalBox.querySelector('#add-modal__input-name');
const userImageLink = addImageModalBox.querySelector('#add-modal__input-link');
const profileEditForm = document.querySelector('#profile__modal-form');
const addImageEditForm = document.querySelector('#add-image__modal-form');
const cardListElements = document.querySelector('.cards');

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

modalsByArray.forEach((modal) => {
    modal.addEventListener('mousedown', (e) => {
        if (modal.classList.contains('modal_opened') && e.target === modal) {
            closeModal(modal);
        }
    });
});

//section for event handlers
editButton.addEventListener("click", () => {
    userNameInput.setAttribute("value", userName.textContent);
    userDescInput.setAttribute("value", userCareer.textContent);
    openModal(profileModalBox);
});

addImageButton.addEventListener("click", () => {
    openModal(addImageModalBox);
});

profileModalExitButton.addEventListener("click", () => {
    closeModal(profileModalBox);
});

addImageModalExitButton.addEventListener("click", () => {
    closeModal(addImageModalBox);
});

enlargedModalExitButton.addEventListener("click", () => {
    closeModal(enlargedModalBox);
});

profileEditForm.addEventListener("submit", (e) => {
    e.preventDefault();
    userName.textContent = userNameInput.value;
    userCareer.textContent = userDescInput.value;
    closeModal(profileModalBox);
});

addImageEditForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = userImageTitle.value;
    const link = userImageLink.value;
    
    cardListElements.prepend(createCard({name, link}));
    addImageEditForm.reset();
    closeModal(addImageModalBox);
});

const createCard = (cardData) => {
    const card = new Card(cardData, "#card-template")
    return card.generateCard()
  }
//initializing and adding our cards to the list
initialCards.forEach((cardData) => {
    cardListElements.append(createCard(cardData));
})
