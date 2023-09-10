const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

// const { v4: uuidv4 } = require('uuid');
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

module.exports = notes;
