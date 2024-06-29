/* this file is responsible for defining and handling the HTTP routes related to petReports operations, It uses the Express Router to organize and manage these routes,
associating each route with specific controller functions that contain the logic for handling the requests. */

/* formController is imported from formPageControllers, which contains the functions that handle the logic for each form-related action.*/

// formRouter.js

const express = require('express'); /* creates an object of express. */
const multer = require('multer');
const path = require('path');
const { formController } = require('../controllers/formPageController');

const formRouter = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });


formRouter.get('/', formController.createLostPetReport);


// New POST route for form submission with file upload
formRouter.post('/submit', upload.array('photos', 10), formController.submitLostPetReport);

module.exports = { formRouter };
