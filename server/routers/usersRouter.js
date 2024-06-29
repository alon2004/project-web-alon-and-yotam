/* this file is responsible for defining and handling the HTTP routes related to user operations, It uses the Express Router to organize and manage these routes,
associating each route with specific controller functions that contain the logic for handling the requests. */

/* usersRouter.js*/

const Router = require('express').Router;

/* usersController is imported from usersControllers, which contains the functions that handle the logic for each user-related action.*/
const { usersController } = require('../controllers/usersControllers');



const usersRouter = Router(); /* an express library function - create a instance of Router. */
/* i use the usersRouter instance to define various HTTP routes and associate them with controller functions. Each route is defined using methods like get, post, put, and delete.*/

/* 
GET - is used for retrieving data.
POST - is used for creating new resources.
PUT - is used for updating existing resources.
DELETE -  is used for deleting resources.
 */

usersRouter.get('/', usersController.getAllUsers);
usersRouter.get('/:id', usersController.getUserById);
usersRouter.post('/', usersController.createUser);
usersRouter.put('/:id', usersController.updateUser);
usersRouter.delete('/:id', usersController.deleteUser);

module.exports = { usersRouter };