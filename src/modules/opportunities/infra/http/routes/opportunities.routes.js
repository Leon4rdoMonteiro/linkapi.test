const { Router } = require('express');
const OpportunityController = require('../controllers/OpportunityController');

const routes = Router();

routes.put('/', OpportunityController.create);
routes.get('/', OpportunityController.index);
routes.options('/', ({ res }) => res.json({ allow: 'PUT, GET' }));

module.exports = routes;
