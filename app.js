let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", addFunc);
showNotes();
function addFunc(e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
  noteObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(noteObj));
  addTxt.value = "";

  showNotes();
}

function showNotes() {
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }

  let html = "";

  noteObj.forEach((element, index) => {
    html += `
    <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text"> ${element}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>`;
  });
  let noteElement = document.getElementById("notes");

  if (noteObj.length != 0) {
    noteElement.innerHTML = html;
  } else {
    noteElement.innerHTML = "Nothing to show. Please add the note.";
  }
}

//Delete function call to delete the note.
function deleteNote(index) {
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }

  noteObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(noteObj));
  showNotes();
}

//Search the note

let searchTxt = document.getElementById("searchTxt");

searchTxt.addEventListener("input", searchFunc);

function searchFunc() {
  let inputVal = searchTxt.value.toLowerCase();
  let noteCard = document.getElementsByClassName("noteCard");

  Array.from(noteCard).forEach((elements) => {
    let cardText = elements.getElementsByTagName("p")[0].innerText;

    if (cardText.includes(inputVal)) {
      elements.style.display = "block";
    } else {
      elements.style.display = "none";
    }
  });
}
