
export default class Card {
    constructor({ name, link, id, isLiked }, cardSelector, handleCardClick, handleCardDelete, handleCardLike) {
        this._name = name;
        this._link = link;
        this._id = id;
        this._isLiked = isLiked;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleCardDelete;
        this._handleCardLike = handleCardLike;
    }

    _renderLikes() {
        const likeButton = this._cardElement.querySelector(".card__like-button");
        if (this._isLiked) {
            likeButton.classList.add("card__like-button_clicked")
        } else {
            likeButton.classList.remove("card__like-button_clicked")
        }
    }

    _setEventListeners() {
        this._cardElement.querySelector(".card__like-button")
            .addEventListener("click", () => {
                this._handleCardLike()
            });

        this._cardElement.querySelector(".card__delete-button")
            .addEventListener("click", () => {
                this._handleDeleteCard()
            });

        this._cardElement.querySelector("#card-image-button")
            .addEventListener("click", () => { this._handleCardClick({ name: this._name, link: this._link }) });
    }

    setIsLiked(isLiked) {
        this._isLiked = isLiked;
        this._renderLikes();
    }

    isLiked() {
        return this._isLiked;
    }

    delete() {
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
        this._renderLikes();


        return this._cardElement;
    }
}
