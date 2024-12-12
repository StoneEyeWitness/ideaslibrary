class Modal{
    constructor(){
        this._modal = document.querySelector("#modal");
        this._modalButton = document.querySelector("#modal-btn");
        this.addEventListeners();
    }
    addEventListeners(){
        this._modalButton.addEventListener('click',this.openModal.bind(this));
        window.addEventListener('click',this.outsideModal.bind(this));
        document.addEventListener('closemodal',() => this.closeModal());
    }
    openModal() {
        this._modal.style.display = 'block';
    }    
    closeModal() {
        this._modal.style.display = 'none';
    }
    outsideModal(e) {
        if(e.target === this._modal)
            this.closeModal();
    }
}

export default Modal;