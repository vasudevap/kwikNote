//
// CONFIGURE EXPRESS SERVER
//
// Import Express.js
const express = require('express');
// Initialize an instance of Express.js
const app = express();
// Specify on which port the Express.js server will run
const PORT = process.env.port || 3001;

//
// SETUP FILE SYSTEM LIBRARY
//
// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');

//
// SETUP MIDDLEWARE - API ROUTE
//
// Import route to API
const api = require('./routes/index.js');
// route any calls to the '/api' resource to index.js
app.use('/api', api);

//
// SETUP STATIC MIDDLEWARE - PUBLIC FOLDER
//
// route any calls not to the '/api' resource to public folder
app.use(express.static('public'));

//
// SETUP GET ROUTES
//
// Create Express.js GET routes for default '/' and '/notes' endpoints
app.get('/', (req, res) => {
    console.log(req.url);
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.get('/notes', (req, res) => {
    console.log(req.url);
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});
// Create Express.js GET routes for '*' endpoint (any not explicitly defined above)
app.get('*', (req, res) => {
    console.log(req.url);
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//
// PORT LISTENER
//
// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));
