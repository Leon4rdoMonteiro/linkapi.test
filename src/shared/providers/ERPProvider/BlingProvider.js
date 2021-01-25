const bling = require('../../infra/http/integrations/bling');

class BlingProvider {
  async createOrder(xmlBody) {
    try {
      const { data: product } = await bling.post(`/pedido/json?xml=${xmlBody}`);

      return product;
    } catch (err) {
      const { response } = err;

      throw {
        status: response.data.errorCode,
        message: response.data.error,
      };
    }
  }
}

module.exports = BlingProvider;
