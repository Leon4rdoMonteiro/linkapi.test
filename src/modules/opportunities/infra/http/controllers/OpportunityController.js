const CreateOpportunitiesService = require('../../../services/CreateOpportunitiesService');
const GetAllOpportunitiesService = require('../../../services/GetAllOpportunitiesService');

const createOpportunitiesService = new CreateOpportunitiesService();
const getAllOpportunitiesService = new GetAllOpportunitiesService();

class OpportunityController {
  async create(req, res) {
    const { status, ...data } = await createOpportunitiesService.run();

    return res.status(status).json(data);
  }

  async index(req, res) {
    const { date } = req.query;

    const { status, ...data } = await getAllOpportunitiesService.run(date);

    return res.status(status).json(data);
  }
}

module.exports = new OpportunityController();
