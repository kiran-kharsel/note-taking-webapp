// inputs
const titleInput = document.querySelector("#input-title");
const tagsInput = document.querySelector("#input-tags");
const descInput = document.querySelector("#main-textarea");
const saveNoteBtn = document.querySelector(".save-note");
const cancelNoteBtn = document.querySelector(".cancel-note");
const archiveNoteBtn = document.querySelector(".archive-note");
const deleteNoteBtn = document.querySelector(".delete-note");

const allNoteList = document.querySelector(".note-list");
const tagListElem = document.querySelector('.tag-list')

const allnoteListBtn =document.querySelector('.allnote-list-btn')
const archivedListBtn = document.querySelector('.archived-list-btn')

// arrays
let notes = [];
let archivedNotes = [];
let tagsArray = [];
let noteEditId = null;


archivedListBtn.addEventListener('click', function(){
  console.log(archivedNotes)
  renderList(archivedNotes)
})


saveNoteBtn.addEventListener("click", function () {
  let title = titleInput.value;
  let tags = tagsInput.value
  let desc = descInput.value;
  const noteId = Math.floor(Math.random() * (1000000 - 0 + 1)) + 0;

  const noteObj = {
    title,
    desc,
    tags,
    noteId
  };

  //check for editing note
  if(noteEditId !== null){
    notes.forEach((note) => {
      if(note.noteId === noteEditId){
        note.title = title;
        note.desc = desc;
        note.tags = tags;
        note.noteId = noteId;
        noteEditId = null;
      }
    })
  } else{
    notes.unshift(noteObj);
  }
 

  // fn to render list
  renderList(notes);

  //convert tags into arrray
  const alltags = noteObj.tags.split(',').map(tag => tag.trim().toLowerCase());
  tagsArray = [...alltags, ...tagsArray]
  renderTags(tagsArray)


  //reset values of inputs
  titleInput.value = "";
  tagsInput.value = "";
  descInput.value = "";
});

function renderList(list) {
  allNoteList.innerHTML = "";
  
  let date = formatDate()

  list.forEach((item) => {
    const li = document.createElement("li");
    li.className = "note flex";

    // //convert tags into arrray
    const alltags = item.tags.split(',').map(tag => tag.trim().toLowerCase());
    // tagsArray = [...alltags]
    
    li.innerHTML = `
        <h3>${item.title}</h3>
        <div class="tags">
        </div>
        <p class="date">${date}</p>
        `;

    //create tags
    alltags.forEach((tag) => {
        const span = document.createElement("span");
        span.className = 'tag';
        span.innerHTML = tag;
        li.querySelector('.tags').appendChild(span)
    });

    li.addEventListener('click', function(){
        // edit note
        editNote(item)
        // show archive and delete btns
        // console.log(document.querySelector('.editor-btns'))
        document.querySelector('.editor-action-btns').classList.remove('hidden')
    })

    allNoteList.appendChild(li);
  });
};


// edi note
function editNote(noteObj){
  titleInput.value = noteObj.title;
  tagsInput.value = noteObj.tags
  descInput.value = noteObj.desc
  noteEditId = noteObj.noteId;

  // show cancel and archive btn if edit byn press
}



cancelNoteBtn.addEventListener('click', function(){
  cancelUpdatedNote()
})

// cancel edited note
function cancelUpdatedNote(){
  // render old list
  renderList(notes);
  // clean editor
  titleInput.value = "";
  tagsInput.value = "";
  descInput.value = "";
}

// delete note
deleteNoteBtn.addEventListener('click', function(){
  // get id, filter notes, render list, null-id
  notes = notes.filter((note) => note.noteId !== noteEditId)
  renderList(notes)
  noteEditId = null;

  // clean editor
  titleInput.value = "";
  tagsInput.value = "";
  descInput.value = "";
})


// archive note
archiveNoteBtn.addEventListener('click', function(){
  // get id of obj, create a archivelist, push to it, remove from all notes, render all-notes
  let archivedNote  = notes.filter((note) => note.noteId === noteEditId)
  console.log(archivedNote)
  archivedNotes.push(...archivedNote)
  notes = notes.filter((note) => note.noteId !== noteEditId)
  renderList(notes)
  noteEditId = null;
  // clean editor
  titleInput.value = "";
  tagsInput.value = "";
  descInput.value = "";
})


// format date
function formatDate() {
    const currentDate = new Date();
  const year = currentDate.getFullYear();
  // getMonth() is zero-based, so add 1 for the correct month number
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  return `${day}/${month}/${year}`;
}


// render tags
function renderTags(tags){
  console.log(tags)
  // filter out duplicate elements
  const filteredTags = [...new Set(tags)]

  tagListElem.innerHTML = '';
  filteredTags.forEach((tag) => {
    let li = document.createElement('li')
    li.className = 'tag-item';
    li.innerHTML = `
    <i class="fa-solid fa-tag"></i>
    <span class="tag-name">${tag}</span>
    `;
    tagListElem.appendChild(li);

    // show tag filtered notes
    li.addEventListener('click', function(){
      // filterbytags
      filterByTagName(tag)
    })
  })
}

// filter by tags
function filterByTagName(tag){
  console.log(tag)
  // filter list
  const filteredNotes = notes.filter((note) => {
    return note.tags.includes(tag)
  })

  // render list
  renderList(filteredNotes)
}