const PipeDriveProvider = require('../providers/CRMProvider/PipeDriveProvider');

class SearchForDealsService {
  constructor(pipeDriveProvider = new PipeDriveProvider()) {
    this.pipeDriveProvider = pipeDriveProvider;
  }

  async run() {
    const { data: deals } = await this.pipeDriveProvider.getAllDeals();

    if (!deals) {
      throw {
        status: 404,
        message: 'No new opportunities found at the moment',
      };
    }

    return deals;
  }
}

module.exports = SearchForDealsService;
