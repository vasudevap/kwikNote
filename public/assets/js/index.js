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

const getNotes = () =>
  fetch('api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json()) // PV added then to handle response
    .then((data) => {
      console.log('Successful GET request:', data);
      return data;
    })
    .catch((error) => {
      console.error('Error in GET request:', error);
    });

const saveNote = (note) =>
  fetch('api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  }); // .then for promise is handled by handleNoteSave

const deleteNote = (note) =>
  fetch('api/notes/', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });// PVVVVVVVV: NEED TO ADD .then HERE TO DO SOMETHING W RES

const renderActiveNote = () => {

  // when the note is clicked on in the sidebar
  // hide the save button since we're retrieving 
  // a saved note
  hide(saveNoteBtn);

  noteTitle.value = activeNote.title;
  noteText.value = activeNote.text;

};

// save the active note 
const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };
  saveNote(newNote).then(() => {
    console.log("in here now")
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
const handleNoteDelete = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  // get which note was selected for deletion
  // FIX THIS... NEED TO GET PROPER ELEMENT
  const noteEl = e.target;
  // AND SET IT TO NOTE-EL SO THE FOLLOWING CAN
  // START WORKING...

  console.log(e.target.parent);
  
  const noteToDelete = {
    title: noteEl.title,
    note: noteEl.text
  };

  console.log(noteToDelete);
  // call api to delete the selected node
  // by making the body as the node object
  // deleteNote(noteToDelete).then(() => {
  //   console.log("past api call");
  //   getAndRenderNotes();
  //   renderActiveNote();
  // });
  // const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  // if (activeNote.id === noteId) {
  // activeNote = {};
  // }


};

// Sets the activeNote and displays it
const handleNoteView = (e) => {
  e.preventDefault();
  console.log("in handle note view");
  console.log(e);
  console.log(e.target);
  console.log(e.target.parentElement);

  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};

// Sets the activeNote to an empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
  activeNote = {};
  renderActiveNote();
};

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

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleNoteDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };

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

// newNoteBtn = document.querySelector('.new-note');
// noteList = document.querySelectorAll('.list-container .list-group');

if (window.location.pathname === '/notes.html') {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  noteTitle.addEventListener('keyup', handleRenderSaveBtn);
  noteText.addEventListener('keyup', handleRenderSaveBtn);
}

getAndRenderNotes();
