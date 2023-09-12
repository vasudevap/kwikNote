let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

if (window.location.pathname === '/notes.html') {
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  noteList = document.querySelectorAll('.list-container .list-group');
}

// Show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

// get all notes 
// from local db file
// by requesting the server
const getNotes = () =>
  fetch('api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error('Error in GET request:', error);
    });

// save the note with given details
// to the local db file
// by requesting the server
const saveNote = (note) =>
  fetch('api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

// delete the note with given details
// from the local db file
// bu requesting the server 
const deleteNote = (noteObj) =>
  fetch(`api/notes/:${noteObj.noteId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

// show the note with the given details
// in the main/active note area of the page
// if note is null, then display just the 
// placeholders
const renderActiveNote = (note) => {

  // when the note is clicked on in the sidebar
  // hide the save button since we're retrieving 
  // a saved note
  hide(saveNoteBtn);

  if(note){
    noteTitle.value = note.title;
    noteText.value = note.text;
  } else {
    noteTitle.value = "";
    noteText.value = "";
  }

};

// to save, get the active note details
// and call the saveNote fcn to send request
// to server
// then refresh display and 
// clear main/active note to new note
const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };
  // call the server to store newNote
  saveNote(newNote).then(() => {
    // get all the notes
    getAndRenderNotes();
    // clear the main/active note
    renderActiveNote(null);
  });
};

// Delete the clicked note
const handleNoteDelete = (e) => {
  // Prevents the click listener for the list from 
  // being called when the button inside of it is clicked
  e.stopPropagation();

  // console.log(JSON.parse(e.target.parentElement.getAttribute("data-note")).noteId);

  // const { 
  //   deleteNoteTitle, 
  //   deleteNoteText, 
  //   deleteNoteId 
  // } = noteToDelete;
  // console.log(noteToDelete);
  // console.log(deleteNoteTitle+" "+deleteNoteText+" "+deleteNoteId);


  // call the fcn to delete the selected note
  // by sending the note to it and waiting
  // for a response
  deleteNote(JSON.parse(e.target.parentElement.getAttribute("data-note")))
  .then(() => {
    // now refresh the list of notes
    getAndRenderNotes();
    // clear the main/active note
    renderActiveNote(null);
  });
};

// Sets the activeNote and displays it
const handleNoteView = (e) => {
  // stop the event from bubbling up
  e.preventDefault();
  // get the note that was clicked
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  // call fcn to bring in info from clicked note into main/active note 
  renderActiveNote(activeNote);
};

// Sets the activeNote to an empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
  activeNote = {};
  renderActiveNote(null);
};

// If there is anything to save, show the save button, else hide it
const handleRenderSaveBtn = () => {

  if (noteTitle.value.trim() || noteText.value.trim()) {
    show(saveNoteBtn);
  } else {
    hide(saveNoteBtn);
  }

};

// Render the list of note titles
const renderNoteList = async (notes) => {

  let jsonNotes = await notes;

  // clear the sidebar of any visible notes
  if (window.location.pathname === '/notes.html') {
    noteList.forEach((el) => (el.innerHTML = ''));
  }

  // start with empty notelist
  let noteListItems = [];

  // Returns HTML element with a delete button
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleNoteView);
    
    liEl.append(spanEl);
    // create the trash can next to the note
    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      // add eventlistener to trigger when trash can is clicked
      delBtnEl.addEventListener('click', handleNoteDelete);
      liEl.append(delBtnEl);
    }
    return liEl;
  };

  // If no notes exist show this
  if (jsonNotes.length === 0) {
    noteListItems.push(createLi('No saved Notes', false));
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);
    noteListItems.push(li);
  });

  if (window.location.pathname === '/notes.html') {
    noteListItems.forEach((note) => noteList[0].append(note));
  }

};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => {
  getNotes().then(renderNoteList);
};

if (window.location.pathname === '/notes.html') {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  noteTitle.addEventListener('keyup', handleRenderSaveBtn);
  noteText.addEventListener('keyup', handleRenderSaveBtn);
}

getAndRenderNotes();
