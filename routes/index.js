const express = require('express');

// Import our modular routers for /notes
const notesRouter = require('./notes');

const app = express();

// Setup middleware to route /api/notes to /notes.js
app.use('/notes', notesRouter);


module.exports = app;
