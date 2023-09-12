const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');

console.log('routes-notes for all logic');

// GET Route 
// retrievie all notes
// from the file
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route 
// save the given note
// to the file 
notes.post('/', (req, res) => {
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

  const deleteNoteTitle = req.body.title;
  const deleteNoteText = req.body.text;

  readFromFile('./db/db.json')
    .then((data) => {

      dataFromDB= JSON.parse(data);
      // search for note to delete
      for (let i=0; i<dataFromDB.length; i++){
        if ((deleteNoteTitle === dataFromDB[i].title) && (deleteNoteText===dataFromDB[i].text)) {
          // remove note
          dataFromDB.splice(i,1);
          
          // write all other notes back into the file
          writeToFile('./db/db.json', dataFromDB);
          res.json(`Note deleted successfully`);
        };
      }
    });
});

module.exports = notes;
