import Popup from "./Popup.js";

export default class PopUpWithForm extends Popup{
    constructor(modal, handleFormSubmit){
        super(modal);
        this._modalForm = this._modal.querySelector('.modal__form');
        this._modalInputs = this._modalForm.querySelectorAll('.modal__input');
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues(){
        //this will get data from the fields with forms
        const _formData = new FormData(this._modalForm);
        const _inputVals = Object.fromEntries(_formData);
        return _inputVals;
    }

    setEventListeners(){
        //this will modify the parent set event listeners and must add 
        //the submit form handler and we call the parent seteventlisteners
        //we can put our submit code in the callback and have the submit fire here
        this._modalForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
        super.setEventListeners();
    }

    close(){
        super.close();
        this._modalForm.reset();
    }
}