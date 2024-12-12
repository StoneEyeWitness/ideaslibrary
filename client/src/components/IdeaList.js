import IdeasApi from "../services/IdeasApi";

class IdeaList{
    constructor(){
        this._ideaList = document.querySelector("#idea-list");
        this._ideas = [];
        this.getIdeas();
    }

    addEventListeners(){
        this._ideaList.addEventListener('click',(e) => {
            if(e.target.classList.contains('fa-times')){
                e.stopImmediatePropagation();
                const ideaID = e.target.parentElement.parentElement.id;
                this.deleteIdea(ideaID);
            }
        })
    }

    async getIdeas(){
        try{
            const response = await IdeasApi.getIdeas();
            this._ideas = response.data.data;
            this.render();
        }
        catch(error){
            console.clear();
            console.log(error);
        }
    }

    async deleteIdea(id){
        try{
            // Delete from Server
            const response = await IdeasApi.deleteIdea(id);
            // Delete from DOM
            this._ideas.filter(idea => idea._id !== id);
            this.getIdeas();
        }catch(error){
            alert('You can not delete this idea');
        }
    }

    addIdeaToList(idea){
        this._ideas.push(idea);
        this.render();
    }

    render(){
        this._ideaList.innerHTML = '';
        this._ideas.forEach(idea => {
            const ideaCard = document.createElement("div");
            ideaCard.id = idea._id;
            ideaCard.classList.add("card");
            const username = localStorage.getItem("username") ? localStorage.getItem("username") : '';
            ideaCard.innerHTML = (idea.username === username)
                ? `<button class="delete"><i class="fas fa-times"></i></button>
                   <h3>${idea.text}</h3>
                   <p class="tag tag-${idea.tag.toLowerCase()}">${idea.tag}</p>
                   <p>
                        Posted on <span class="date">${idea.date.split('T')[0]}</span> by
                        <span class="author">${idea.username}</span>
                   </p>`
                : `<h3>${idea.text}</h3>
                    <p class="tag tag-${idea.tag.toLowerCase()}">${idea.tag}</p>
                    <p>
                        Posted on <span class="date">${idea.date.split('T')[0]}</span> by
                        <span class="author">${idea.username}</span>
                    </p>`;

            this._ideaList.appendChild(ideaCard);
        })
        this.addEventListeners();
    }
}

export default IdeaList;