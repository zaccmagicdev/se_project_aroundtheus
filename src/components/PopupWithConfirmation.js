import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup{
    constructor(modal){
        super(modal);
        this._modalForm = this._modal.querySelector('.modal__form');
        this._modalButton = this._modal.querySelector('.modal__button');
        this._modalButtonText = this._modalButton.textContent;
    }

    setAction(action){
        this._handleFormSubmit = action;
    }

    renderLoading(isLoading){
        if(isLoading){
            this._modalButton.textContent = "Deleting...";
        } else {
            this._modalButton.textContent = this._modalButtonText;
        }
    }

    setEventListeners(){
        this._modalForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this._handleFormSubmit();
        });
        super.setEventListeners();
    }
}