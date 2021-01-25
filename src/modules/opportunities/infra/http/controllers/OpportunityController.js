const GetAllOpportunitiesService = require('../../../services/GetAllOpportunitiesService');
const CreateOpportunitiesService = require('../../../services/CreateOpportunitiesService');

const createOpportunitiesService = new CreateOpportunitiesService();
const getAllOpportunities = new GetAllOpportunitiesService();

class OpportunityController {
  async create(req, res) {
    const { statusCode, ...data } = await createOpportunitiesService.run();

    return res.status(statusCode).json(data);
  }

  async index(req, res) {
    const { date } = req.query;

    const { statusCode, ...data } = await getAllOpportunities.run(date);

    return res.status(statusCode).json(data);
  }
}

module.exports = new OpportunityController();
