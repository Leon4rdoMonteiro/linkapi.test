const pipedrive = require('../../infra/http/integrations/pipedrive');

class PipeDriveProvider {
  async getDealProducts(deal_id) {
    try {
      const { data: deals } = await pipedrive.get(`/deals/${deal_id}/products`);

      return deals;
    } catch (err) {
      const { response } = err;

      throw {
        status: response.data.errorCode,
        message: response.data.error,
      };
    }
  }

  async getAllDeals() {
    try {
      const { data: deals } = await pipedrive.get('/deals?status=won');

      return deals;
    } catch (err) {
      const { response } = err;

      throw {
        status: response.data.errorCode,
        message: response.data.error,
      };
    }
  }
}

module.exports = PipeDriveProvider;
