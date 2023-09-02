
export default class Card {
    constructor({ name, link }, cardSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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
            .addEventListener("click", () => { this._handleCardClick({name: this._name, link: this._link}) });
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
