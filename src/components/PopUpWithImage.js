import Popup from "./Popup.js";

export default class PopUpWithImage extends Popup{
    constructor(modal){
       super(modal);
       this._modalImage = this._modal.querySelector('.modal__enlarged-image');
       this._modalCaption = this._modal.querySelector('.modal__enlarged-text');
    }

    open(name, link){
        this._modalImage.setAttribute('src', link);
        this._modalImage.setAttribute('alt', name);
        this._modalCaption.textContent = name;
        super.open();
    }
}