
export default class Card {
    constructor({ name, link, id, likeStatus}, cardSelector, handleCardClick, handleCardDelete, handleCardLike) {
        this._name = name;
        this._link = link;
        this._id = id;
        this._likeStatus = likeStatus;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleCardDelete;
        this._handleCardLike = handleCardLike;
    }

    _handleLikeButton() {
        const likeButton = this._cardElement.querySelector(".card__like-button");
        likeButton.classList.toggle("card__like-button_clicked");
    }

    _setEventListeners() {
        this._cardElement.querySelector(".card__like-button")
            .addEventListener("click", () => { 
                this._handleLikeButton()
                this._handleCardLike()
            });

        this._cardElement.querySelector(".card__delete-button") 
            .addEventListener("click", () => { this._handleDeleteCard() });

        this._cardElement.querySelector("#card-image-button")
            .addEventListener("click", () => { this._handleCardClick({name: this._name, link: this._link}) });

        this._checkStatus();    
    }

    delete(){
        this._cardElement.remove();
    }

    _checkStatus(){
        const likeButton = this._cardElement.querySelector(".card__like-button");
        if(this._likeStatus){
            likeButton.classList.add("card__like-button_clicked")
        } else {
            likeButton.classList.remove("card__like-button_clicked")
        }
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
