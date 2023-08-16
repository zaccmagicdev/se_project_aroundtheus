import { openModal } from "../utils/utils.js";

const enlargedModalBox = document.querySelector('#enlarged-modal-box');
const enlargedModalImg = enlargedModalBox.querySelector('.modal__enlarged-image');
const enlargedModalTxt = enlargedModalBox.querySelector('.modal__enlarged-text');


export default class Card {
    constructor({ name, link }, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
    }

    _handleEnlargeImage() {
        // this is going to be where we enable our image modal
        enlargedModalImg.setAttribute('src', this._link);
        enlargedModalImg.setAttribute('alt', this._name);
        enlargedModalTxt.textContent = this._name;

        openModal(enlargedModalBox);
    }

    _handleLikeButton() {
        this._cardElement.querySelector(".card__like-button")
            .classList.toggle("card__like-button_clicked");
    }

    _handleDeleteCard() {
        this._cardElement.remove();   
    }

    _setEventListeners() {
        this._cardElement.querySelector(".card__like-button")
            .addEventListener("click", () => { this._handleLikeButton() });

        this._cardElement.querySelector(".card__delete-button") 
            .addEventListener("click", () => { this._handleDeleteCard() });

        this._cardElement.querySelector("#card-image-button")
            .addEventListener("click", () => {this._handleEnlargeImage()});    
    }

    generateCard() {
        //this is where it gets a little bit tricky..we need to select our appropriate elements and fields then return a card object
        //this is also going to be where we call out setEventListeners method
        this._cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector(".card")
            .cloneNode(true);

        //grabbing our main elements for the card and simply giving them their attrubutes now as an object!     
        const cardText = this._cardElement.querySelector(".card__caption");
        const cardImage = this._cardElement.querySelector(".card__image");

        cardText.textContent = this._name;
        cardImage.setAttribute("alt", this._name);
        cardImage.setAttribute("src", this._link);

        this._setEventListeners();

        return this._cardElement;
    }
}
