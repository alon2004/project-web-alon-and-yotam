/* this file is responsible for defining and handling the HTTP routes related to petReports operations, It uses the Express Router to organize and manage these routes,
associating each route with specific controller functions that contain the logic for handling the requests. */


/* petsRouter.js */
const { Router } = require('express'); 
/* petController is imported from petsControllers, which contains the functions that handle the logic for each pet-related action.*/
const { petsController } = require('../controllers/petsControllers');
const petsRouter = Router();
 /* an express library function - create a instance of Router. */
/* i use the usersRouter instance to define various HTTP routes and associate them with controller functions. Each route is defined using methods like get, post, put, and delete.*/

petsRouter.get('/', petsController.getAllReports);
petsRouter.get('/innerjoin', petsController.getInnerJoin);
petsRouter.get('/:id', petsController.getReportById);
petsRouter.post('/', petsController.createReport);
petsRouter.put('/:id', petsController.updateReport);
petsRouter.delete('/:id', petsController.deleteReport);

module.exports = { petsRouter };
