// inputs
const titleInput = document.querySelector("#input-title");
const tagsInput = document.querySelector("#input-tags");
const descInput = document.querySelector("#main-textarea");
const saveNoteBtn = document.querySelector(".save-note");

const allNoteList = document.querySelector(".note-list");
const tagListElem = document.querySelector('.tag-list')

// arrays
let notes = [];
let tagsArray = [];



saveNoteBtn.addEventListener("click", function () {
  let title = titleInput.value;
  let tags = tagsInput.value
  let desc = descInput.value;

  const noteObj = {
    title,
    desc,
    tags
  };

  notes.unshift(noteObj);

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

  list.forEach((item, index) => {
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
        console.log('ok')
        titleInput.value = item.title;
        descInput.value = item.desc;
        tagsInput.value = item.tags;
    })

    allNoteList.appendChild(li);
  });
}

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
  })
}