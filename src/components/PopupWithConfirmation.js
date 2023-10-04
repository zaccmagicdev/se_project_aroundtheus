import Popup from "./Popup";

export default class PopupWithComfirmation extends Popup{
    constructor(modal, handleFormSubmit){
        super(modal);
        this._handleFormSubmit = handleFormSubmit;
        this._modalForm = this._modal.querySelector('.modal__form');
        this._submitButton = this._modalForm.querySelector('.modal__button');
    }

    open(cardElement, cardId){
        super.open();
        this._cardElement = cardElement;
        this._id = cardId;
    }

    close(){
        super.close();
    }

    setEventListeners(){
        this._modalForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this._handleFormSubmit(this._cardElement, this._id);
        });
        super.setEventListeners();
    }
}