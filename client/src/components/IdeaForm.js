import IdeasApi from "../services/IdeasApi";
import IdeaList from "./IdeaList";

class IdeaForm{
    constructor(){
        this._formModal = document.querySelector("#form-modal");
        this._ideaList = new IdeaList();
    }

    addEventListeners(){
        this._ideaForm.addEventListener('submit',this.submitData.bind(this));
    }

    async submitData(e){
        e.preventDefault();
        const idea = {
            text: this._ideaForm.elements.text.value,
            tag: this._ideaForm.elements.tag.value,
            username: this._ideaForm.elements.username.value,
        }

        if(!idea.text || !idea.tag || !idea.username){
            alert('Please enter all fields');
            return;
        }

        // Save username to localstorage
        localStorage.setItem('username',idea.username);

        // Add idea to server
        const newIdea = await IdeasApi.createIdea(idea);

        // Add idea to list
        this._ideaList.addIdeaToList(newIdea.data.data);

        console.table(idea);
        // Clear the form
        this.clearForm();
        this.render();
        // Close the modal
        document.dispatchEvent(new Event('closemodal'));
    }

    render(){
        this._formModal.innerHTML = `<form id="idea-form">
                                        <div class="form-control">
                                            <label for="idea-text">Enter a Username</label>
                                            <input type="text" name="username" id="username" value="${localStorage.getItem('username') ? localStorage.getItem('username') : ''}"/>
                                        </div>
                                        <div class="form-control">
                                            <label for="idea-text">What's Your Idea?</label>
                                            <textarea name="text" id="idea-text"></textarea>
                                        </div>
                                        <div class="form-control">
                                            <label for="tag">Tag</label>
                                            <input type="text" name="tag" id="tag" />
                                        </div>
                                        <button class="btn" type="submit" id="submit">Submit</button>
                                    </form>`;
                                    
        this._ideaForm = document.querySelector("#idea-form");
        this.addEventListeners();
    }

    clearForm() {
        this._ideaForm.elements.text.value = '';
        this._ideaForm.elements.tag.value = '';
        this._ideaForm.elements.username.value = '';
    }
}

export default IdeaForm;