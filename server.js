// CONFIGURE EXPRESS SERVER
// Import Express.js
const express = require('express');

// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');

// Define notes API where we will process HTTP methods
const api = require('./routes/notes');

// Initialize an instance of Express.js
const app = express();

// Activate MIDDLEWARE for parsing application /json and urlencoded data
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Port for Express.js server to listen on
const PORT = 3001;

// SETUP MIDDLEWARE - API ROUTE
// FIRST route any calls to the '/api/notes' resource to routes/notes
app.use('/api/notes', api);

// SETUP STATIC MIDDLEWARE - PUBLIC FOLDER
// SECOND route all other calls that match
// to public folder - i.e. index.html and notes.html
app.use(express.static('public'));


app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

// Create Express.js GET routes for '*' endpoint
// catch all for everything not understandable
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

//
// PORT LISTENER
//
// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () => console.log(`kwikNote listening at http://localhost:${PORT}`));
