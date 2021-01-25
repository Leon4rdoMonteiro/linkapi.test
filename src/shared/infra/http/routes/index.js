const { Router } = require('express');

const opportunitiesRoutes = require('../../../../modules/opportunities/infra/http/routes/opportunities.routes');

const router = Router();

router.get('/', ({ res }) =>
  res.json({ message: 'Welcome to LinkApi opportunities API' }),
);

router.use('/opportunities', opportunitiesRoutes);

module.exports = router;
