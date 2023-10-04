
export default class Card {
    constructor({ name, link, id , likes}, cardSelector, handleCardClick, handleCardDelete, handleCardLike) {
        this._name = name;
        this._link = link;
        this._id = id;
        this._likes = likes;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleCardDelete;
        this._handleLikeCard = handleCardLike;
    }

    _handleLikeButton() {
        const numLikes = this._cardElement.querySelector(".card__likes-int");
        const likeButton = this._cardElement.querySelector(".card__like-button");
        likeButton.classList.toggle("card__like-button_clicked");
            //this is where we will write a tertiry statement to toggle this class and call our api to update the number of likes in a card
        if(likeButton.classList.contains("card__like-button_clicked")){
            this._likes++;
            numLikes.textContent = this._likes;
        } else {
            this._likes--;
            numLikes.textContent = "";
        }

    }

    _isLiked(){
        if(this._cardElement.querySelector(".card__like-button").classList.contains("card__like-button_clicked")){
            return true;
        } else {
            return false;
        }
    }

    _setEventListeners() {
        this._cardElement.querySelector(".card__like-button")
            .addEventListener("click", () => { 
                this._handleLikeButton()
                this._handleLikeCard(this._isLiked()) 
            });

        this._cardElement.querySelector(".card__delete-button") 
            .addEventListener("click", () => { this._handleDeleteCard() });

        this._cardElement.querySelector("#card-image-button")
            .addEventListener("click", () => { this._handleCardClick({name: this._name, link: this._link}) });
    }

    delete(){
        this._cardElement.remove();
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
