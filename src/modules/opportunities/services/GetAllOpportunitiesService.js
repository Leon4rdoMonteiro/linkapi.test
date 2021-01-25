const { isValid } = require('date-fns');

const AppError = require('../../../shared/errors/AppError');
const OpportunityRepository = require('../repositories/OpportunityRepository');

class GetAllOpportunitiesService {
  constructor(opportunityRepository = new OpportunityRepository()) {
    this.opportunityRepository = opportunityRepository;
  }

  async run(date) {
    try {
      if (date) {
        const parsedDate = new Date(date);
        const isValidDate = isValid(parsedDate);

        if (!isValidDate) {
          throw {
            status: 400,
            message: 'The provided date is invalid',
          };
        }
      }

      const opportunities = await this.opportunityRepository.getAll(date);

      if (!opportunities.length) {
        throw {
          status: 404,
          message: 'No saved opportunities found',
        };
      }

      return {
        error: false,
        statusCode: 200,
        data: opportunities,
      };
    } catch (err) {
      throw new AppError({
        statusCode: err.status,
        message: err.message,
      });
    }
  }
}

module.exports = GetAllOpportunitiesService;
