// Import Express.js
const express = require('express');

// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');

// Import route to API
const api = require('./routes/index.js');

// Initialize an instance of Express.js
const app = express();

// Specify on which port the Express.js server will run
const PORT = 3001;

// Static middleware pointing to the public folder
app.use(express.static('public'));

//
// GET ROUTES
//
// Create Express.js GET routes for default '/' and '/notes' endpoints
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));
// Create Express.js GET routes for '*' endpoint (any not explicitly defined above)
app.get('/routes', (req, res) => res.sendFile(path.join(__dirname, 'public/routes.html')));


//
// PORT LISTENER
//
// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));
