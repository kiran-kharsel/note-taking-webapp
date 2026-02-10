// inputs
const titleInput = document.querySelector('#input-title')
const tagsInput = document.querySelector('#input-tags')
const descInput = document.querySelector('#main-textarea')
const saveNoteBtn = document.querySelector('.save-note')

const allNoteList = document.querySelector('.note-list')

let notes = [];




saveNoteBtn.addEventListener('click', function(){
    let title = titleInput.value;
    let tags = tagsInput.value;
    let desc = descInput.value;

   
    const noteObj = {
        title, desc
    }

    notes.push(noteObj)
    console.log(noteObj)
    // fn to render list
    renderList(notes);
});


function renderList(list){
    allNoteList.innerHTML = '';

    list.forEach((item) => {
        const li = document.createElement('li')
        li.className = 'note flex';
        li.innerHTML = `
        <h3>${item.title}</h3>
        <div class="tags">
            <span class="tag">dev</span>
            <span class="tag">react</span>
        </div>
        <p class="date">19 Oct 2028</p>
        `;
        allNoteList.appendChild(li)
    });
}