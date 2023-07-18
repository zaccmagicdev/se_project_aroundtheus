//our initial array
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

//variables we need
const editButton = document.querySelector('#edit-button');
const addImageButton = document.querySelector('.profile__add-button');
const profileModalBox = document.querySelector('#profile-modal-box');
const addImageModalBox = document.querySelector('#add-modal-box');
const enlargedModalBox = document.querySelector('#enlarged-modal-box');
const enlargedModalImg = enlargedModalBox.querySelector('.modal__enlarged-image');
const enlargedModalTxt = enlargedModalBox.querySelector('.modal__enlarged-text');
const enlargedModalExitButton = enlargedModalBox.querySelector('.modal__exit-button');
const profileModalExitButton = profileModalBox.querySelector('.modal__exit-button');
const addImageModalExitButton = addImageModalBox.querySelector('.modal__exit-button');
const profileModalSaveButton = document.querySelector('#profile-modal-save-button');
const addImageModalCreateButton = document.querySelector('#add-modal-create-button');
const userName = document.querySelector('#user-name');
const userCareer = document.querySelector('#user-career');
const userNameInput = document.querySelector('#profile-modal__input-name');
const userDescInput = document.querySelector('#profile-modal__input-description');
const userImageTitle = addImageModalBox.querySelector('#add-modal__input-name');
const userImageLink = addImageModalBox.querySelector('#add-modal__input-link');
const profileEditForm = document.querySelector('#profile__modal-form');
const addImageEditForm = document.querySelector('#add-image__modal-form');
const cardTemplate = document.querySelector('#card-template').content.firstElementChild;
const cardListElements = document.querySelector('.cards');


//section for required functions
function getCardElement(cardData){
    const cardElement = cardTemplate.cloneNode(true);
    let cardCaption = cardElement.querySelector('.card__caption');
    let cardImage = cardElement.querySelector('.card__image');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardImageButton = cardElement.querySelector('#card-image-button');

    cardImageButton.addEventListener("click", () => {
        enlargedModalImg.setAttribute('src', cardData.link);
        enlargedModalImg.setAttribute('alt', cardData.name);
        enlargedModalTxt.textContent = cardData.name;

        openModal(enlargedModalBox);
    });

    cardLikeButton.addEventListener("click", () => {
        cardLikeButton.classList.toggle('card__like-button_clicked');
    });

    cardDeleteButton.addEventListener("click", () => {
        cardElement.remove();
    });

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

    if(!link.includes("https")){
        alert("Please enter a valid image link!");
    } else {

    const newCard = getCardElement({
        name,
        link,
    });

    cardListElements.prepend(newCard);
    closeModal(addImageModalBox);
    }
});

//initializing and adding our cards to the list
initialCards.forEach((cardData) => {
   const cardElement = getCardElement(cardData);
   cardListElements.append(cardElement);
});