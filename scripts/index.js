const initialCards = [{
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
},{
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
},{
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
},{
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
},{
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
},{
    name: "Lago di Braise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
}];

const editButton = document.querySelector('#edit-button');
const addImageButton = document.querySelector('.profile__add-button');
const profileModalBox = document.querySelector('#profile-modal-box');
const addImageModalBox = document.querySelector('#add-modal-box');
const profileModalExitButton = profileModalBox.querySelector('.modal__exit-button');
const addImageModalExitButton = addImageModalBox.querySelector('.modal__exit-button');
const profileModalSaveButton = document.querySelector('#profile-modal-save-button');
const addImageModalSaveButton = document.querySelector('#add-modal-save-button');
const userName = document.querySelector('#user-name');
const userCareer = document.querySelector('#user-career');
const userNameInput = document.querySelector('#profile-modal__input-name');
const userDescInput = document.querySelector('#profile-modal__input-description');
const profileEditForm = document.querySelector('#profile__modal-form');
const cardTemplate = document.querySelector('#card-template').content.firstElementChild;
const cardListElements = document.querySelector('.cards');

function getCardElement(cardData){
    const cardElement = cardTemplate.cloneNode(true);
    let cardCaption = cardElement.querySelector('.card__caption');
    let cardImage = cardElement.querySelector('.card__image');

    cardCaption.textContent = cardData.name;
    cardImage.setAttribute('src', cardData.link);
    cardImage.setAttribute('alt', cardData.name);

    return cardElement;
}

function openModal(modal){
    modal.classList.add('modal__opened');
}

function closeModal(modal){
    modal.classList.remove('modal__opened')
}

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

profileEditForm.addEventListener("submit", (e) => {
    e.preventDefault();
    userName.textContent = userNameInput.value;
    userCareer.textContent = userDescInput.value;
    closeModal(profileModalBox);
});

initialCards.forEach((cardData) => {
   const cardElement = getCardElement(cardData);
   cardListElements.append(cardElement);
});