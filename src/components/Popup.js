
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
        this._modal.classList.add('modal_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._modal.classList.remove('modal_opened');
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