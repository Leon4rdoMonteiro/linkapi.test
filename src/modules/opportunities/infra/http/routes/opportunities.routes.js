const { Router } = require('express');
const OpportunityController = require('../controllers/OpportunityController');

const routes = Router();

routes.put('/', OpportunityController.create);
routes.get('/', OpportunityController.index);

module.exports = routes;
