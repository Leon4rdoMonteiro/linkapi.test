const orders = require('../mocks/orders.json');

class FakeBlingProvider {
  async createOrder() {
    return orders;
  }
}

module.exports = FakeBlingProvider;
