
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;


// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(path.dirname(__dirname), 'public')));

const { usersRouter } = require('./routers/usersRouter');
const { petsRouter } = require('./routers/petsRouter');
console .log(__dirname);

// CORS headers
app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.set('Content-Type', 'application/json');
    next();
});

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);

app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
});
