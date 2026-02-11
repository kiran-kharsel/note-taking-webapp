// inputs
const titleInput = document.querySelector("#input-title");
const tagsInput = document.querySelector("#input-tags");
const descInput = document.querySelector("#main-textarea");
const saveNoteBtn = document.querySelector(".save-note");

const allNoteList = document.querySelector(".note-list");

let notes = [];

saveNoteBtn.addEventListener("click", function () {
  let title = titleInput.value;
  let tags = tagsInput.value;
  let desc = descInput.value;

  const noteObj = {
    title,
    desc,
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
    li.innerHTML = `
        <h3>${item.title}</h3>
        <div class="tags">
            <span class="tag">dev</span>
            <span class="tag">react</span>
        </div>
        <p class="date">${date}</p>
        `;
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
