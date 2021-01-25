const OpportunityRepository = require('../repositories/OpportunityRepository');
const CreateOrderService = require('../../../shared/services/CreateOrderService');
const SearchForDealsService = require('../../../shared/services/SearchForDealsService');

const AppError = require('../../../shared/errors/AppError');
const PipeDriveProvider = require('../../../shared/providers/CRMProvider/PipeDriveProvider');

class CreateOpportunitiesService {
  constructor(
    searchForDealsService = new SearchForDealsService(),
    createOrderService = new CreateOrderService(),
    opportunityRepository = new OpportunityRepository(),
    pipeDriveProvider = new PipeDriveProvider(),
  ) {
    this.searchForDealsService = searchForDealsService;
    this.createOrderService = createOrderService;
    this.opportunityRepository = opportunityRepository;
    this.pipeDriveProvider = pipeDriveProvider;
  }

  async run() {
    try {
      let deals = await this.searchForDealsService.run();

      for (const deal of deals) {
        const exists = await this.opportunityRepository.findByDeal(deal.id);

        if (exists) {
          deals = deals.filter(item => item !== deal);
        }
      }

      for (const deal of deals) {
        const { data: products } = await this.pipeDriveProvider.getDealProducts(
          deal.id,
        );

        Object.assign(deal, { products });
      }

      const blingOrders = await this.createOrderService.run(deals);

      let opportunity = await this.opportunityRepository.findTodayRecord();

      if (!opportunity) {
        const [order] = blingOrders;

        opportunity = await this.opportunityRepository.create(order);

        blingOrders.shift();
      }

      const { _id } = opportunity;

      await this.opportunityRepository.updateOpportunities({
        id: _id,
        orders: blingOrders,
      });

      opportunity = await this.opportunityRepository.findTodayRecord();

      return {
        error: false,
        statusCode: 200,
        data: opportunity,
      };
    } catch (err) {
      throw new AppError({
        statusCode: err.status,
        message: err.message,
      });
    }
  }
}

module.exports = CreateOpportunitiesService;
