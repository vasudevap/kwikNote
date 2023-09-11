// CONFIGURE EXPRESS SERVER
// Import Express.js
const express = require('express');

// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');

// Define notes 
const api = require('./routes/notes');

// Initialize an instance of Express.js
const app = express();

// Middleware for parsing application /json and urlencoded data
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Specify on which port the Express.js server will run
const PORT = 3001;

// SETUP MIDDLEWARE - API ROUTE
// Import route to API
// const api = require('./routes/index');
// route any calls to the '/api' resource to index.js
app.use('/api/notes', api);

// SETUP STATIC MIDDLEWARE - PUBLIC FOLDER
// route any calls not to the '/api' resource to public folder
app.use(express.static('public'));

// SETUP GET ROUTES
// Create Express.js GET routes for default '/' and '/notes' endpoints
app.get('/', (req, res) => {

    // log request to console
    console.info(`In get home / ${req.method} to ${req.url}`);

    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// app.get('/notes', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/notes.html'));
//     // log request to console
//     console.info(`In get just notes ${req.method} to ${req.url}`);

// });

// Create Express.js GET routes for '*' endpoint (any not explicitly defined above)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/404.html'));
    // log request to console
    console.info(`In get * ${req.method} to ${req.url}`);

});

//
// PORT LISTENER
//
// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () => console.log(`kwikNote listening at http://localhost:${PORT}`));
