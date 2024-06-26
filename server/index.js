require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 7000; // שינוי הפורט ל-4000

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(path.dirname(__dirname), 'public')));

const { petsRouter } = require('./routers/petsRouter');

// CORS headers
app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.set('Content-Type', 'application/json');
    next();
});

// Basic route for "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html')); // עדכון
});

app.use('/api/pets', petsRouter);

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://192.168.1.119:${port}`);
});
