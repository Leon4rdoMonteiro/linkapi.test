const deals = require('../mocks/deals.json');
const products = require('../mocks/products.json');

class FakePipeDriveProvider {
  async getDealProducts() {
    return products;
  }

  async getAllDeals() {
    return deals;
  }
}

module.exports = FakePipeDriveProvider;
