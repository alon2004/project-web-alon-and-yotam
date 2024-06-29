/* The first js file that runs - responsible of "learim et a sharat and its settings" */

/* index.js */
/* these three lines are responsible for "learim et a sharat" */
require('dotenv').config(); /* loads environment variables from .ev file into an implicit global object calld process.env - it holds the database passwords and host name */
const express = require('express');/*  imports the Express framework, which is a popular web application framework for Node.js. */
const path = require('path');
const app = express(); /* creates an instance of our Express application */
const port = process.env.PORT || 8080; /* if the env file hasent specifed a port nubmer it will be 8080 */

// Middleware for parsing JSON and URL-encoded data
app.use(express.json()); /* Middleware to parse incoming requests with JSON payloads. */
app.use(express.urlencoded({ extended: true }));/* Middleware to parse incoming requests with URL-encoded payloads. When extended is true, it uses the qs library for parsing. */

// Serve static files from the 'public' directory
app.use(express.static(path.join(path.dirname(__dirname), 'public'))); /* Middleware to serve static files from the 'public' directory. path.join(path.dirname(__dirname), 'public') ensures the correct path to the 'public' directory. */

const { usersRouter } = require('./routers/usersRouter'); /* Imports the usersRouter module. */
const { petsRouter } = require('./routers/petsRouter');  /* Imports the petsRouter module. */
const { formRouter } = require('./routers/formRouter'); /* Imports the formRouter module. */

console.log(__dirname);

// CORS headers
/*middlewares   */
app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');/* the astrick means all the domains are allowed - we can set a specific domains as well. */
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); /* declaring which methods can communicate with the server !  */
    res.set('Content-Type', 'application/json');
    next();
});

app.use('/api/users', usersRouter);/* declaring that each request to the server that beings with '/api/users' will end up in the usersRouter file */
app.use('/api/pets', petsRouter);/* declaring that each request to the server that beings with '/api/pets' will end up in the petRouter file */
app.use('/api/lostpetform', formRouter);/* declaring that each request to the server that beings with '/api/lostpetform' will end up in the lfromRouter file */

/* app.listen(port, () => { ... });: This starts the server on the specified port. */
app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
});
