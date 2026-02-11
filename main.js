// inputs
const titleInput = document.querySelector("#input-title");
const tagsInput = document.querySelector("#input-tags");
const descInput = document.querySelector("#main-textarea");
const saveNoteBtn = document.querySelector(".save-note");

const allNoteList = document.querySelector(".note-list");

let notes = [];

saveNoteBtn.addEventListener("click", function () {
  let title = titleInput.value;
  let tags = tagsInput.value.split(',').map(item => item.trim());;
  let desc = descInput.value;

  const noteObj = {
    title,
    desc,
    tags
  };

  notes.unshift(noteObj);

  // fn to render list
  renderList(notes);

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

    console.log(item.tags)
    
    li.innerHTML = `
        <h3>${item.title}</h3>
        <div class="tags">
        </div>
        <p class="date">${date}</p>
        `;

    //create tags
    item.tags.forEach((tag) => {
        const span = document.createElement("span");
        span.className = 'tag';
        span.innerHTML = tag;
        li.querySelector('.tags').appendChild(span)
    });


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
