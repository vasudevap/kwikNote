const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');

console.log('routes-notes for all logic');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {

  console.log("in notes.js GET for / -> /api/notes");

  readFromFile('./db/db.json')
    .then((data) => res.json(JSON.parse(data)));

});

// POST Route for a new note 
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding note');
  }
});

// DELETE Route for existing note 
notes.delete('/', (req, res) => {

  console.log(req.body);

  const deleteNoteTitle = req.body.title;
  const deleteNoteText = req.body.text;

  readFromFile('./db/db.json')
    .then((data) => {

      dataFromDB= JSON.parse(data);
      console.log(dataFromDB.length);
      
      // console.log("going into the for"+dataFromDB[0]+" "+deleteNoteTitle+" "+deleteNoteText);

      // for (let i=0; i<dataFromDB.length; i++){
      //   if ((deleteNoteTitle === dataFromDB[i].title) && (deleteNoteText===dataFromDB[i].text)) {

      //     //remove note
      //     console.log("found it");
      //     dataFromDB.splice(i,1);
      //     writeToFile('./db/db.json', dataFromDB);
      //   };
      //   // console.log(i+": keep going: "+dataFromDB[i].title);

      // }
    });
  // console.log(req);

  // for (let i=0; i<savedNotes.length; i++){
  // if (del_title === savedNotes[i].title && del_text === savedNotes[i].text) {
  // console.log(del_text+" <--> "+savedNotes[i].text);
  // console.log(del_text+" <--> "+savedNotes[i].text);
  // console.log("found element to delete");
  // }
  // }

  console.log("out of the for loop");


});

// console.log("out of the then clause");

// if (req.body) {
//   const newNote = {
//     title,
//     text,
//   };

//   readAndAppend(newNote, './db/db.json');
//   res.json(`Note deleted successfully`);
// } else {
//   res.error('Error in deleting note');
// }
// });

module.exports = notes;
