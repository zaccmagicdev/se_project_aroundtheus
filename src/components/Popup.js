import { openModal, closeModal } from "../utils/utils.js";

export default class Popup {
    constructor(modal) {
        this._modal = document.querySelector(modal);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    open() {
        openModal(this._modal);
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        closeModal(this._modal);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        const closeButton = this._modal.querySelector(".modal__exit-button");
        closeButton.addEventListener("click", () => {
            this.close();
        });

        this._modal.addEventListener('mousedown', (e) => {
            if (this._modal.classList.contains('modal_opened')
                && e.target === this._modal) {
                this.close();
            }
        });
    }
}