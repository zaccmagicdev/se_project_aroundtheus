// this is going to be where handler and modal functions are going to exist from now on! Can't believe I almost totally forgot!
function openModal(modal) {
    modal.classList.add('modal_opened');
    document.addEventListener('keydown', closeOnEscape);
}

function closeModal(modal) {
    modal.classList.remove('modal_opened');
    document.removeEventListener('keydown', closeOnEscape);
}

function closeOnEscape(evt) {
    if (evt.key == "Escape") {
        const openedModal = document.querySelector('.modal_opened');
        closeModal(openedModal);
    }
}

export {openModal, closeModal};
