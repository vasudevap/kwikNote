const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');

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
      noteId: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding note');
  }
});

// DELETE Route for existing note 
notes.delete('/:id',  (req, res) => {

  // // get stored notes from db file
  readFromFile('./db/db.json')
    .then((data) => {

      dataFromDB= JSON.parse(data);
      
      // search for note to delete
      for (let i=0; i<dataFromDB.length; i++){
        if (req.params.id === (":"+dataFromDB[i].noteId)) {
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
