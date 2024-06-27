const {Router} = require('express');
const {petsController} = require('../controllers/petsControllers');

const petsRouter = Router();

petsRouter.get('/', petsController.getAllReports);
petsRouter.get('/:id', petsController.getReportById);
petsRouter.post('/', petsController.createReport);
petsRouter.put('/:id', petsController.updateReport);
petsRouter.delete('/:id', petsController.deleteReport);

module.exports = {petsRouter};


/* declares func names - which brings data from mySql db , implemented in the controller*/