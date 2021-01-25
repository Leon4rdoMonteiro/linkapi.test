const jsontoxml = require('jsontoxml');
const { cnpj } = require('cpf-cnpj-validator');

const BlingProvider = require('../providers/ERPProvider/BlingProvider');

class CreateOrderService {
  constructor(blingProvider = new BlingProvider()) {
    this.blingProvider = blingProvider;
  }

  async run(deals) {
    const blingOrders = [];

    for (const deal of deals) {
      const dealProducts = {
        name: 'itens',
        children: [],
      };

      for (const product of deal.products) {
        dealProducts.children.push({
          name: 'item',
          children: [
            { name: 'codigo', text: product.id },
            { name: 'descricao', text: product.name },
            { name: 'qtde', text: product.quantity },
            { name: 'vlr_unit', text: product.item_price },
            { name: 'un', text: 'un' },
          ],
        });
      }

      const xmlBody = jsontoxml(
        {
          pedido: [
            {
              name: 'cliente',
              children: [
                { name: 'nome', text: deal.org_name },
                {
                  name: 'cpf_cnpj',
                  text: cnpj.generate(),
                },
                { name: 'endereco', text: 'Quadra 03, Conjunto A' },
                { name: 'numero', text: '186' },
                { name: 'bairro', text: 'Fazendinha' },
                { name: 'cep', text: '71596-303' },
                { name: 'cidade', text: 'Brasilia' },
                { name: 'uf', text: 'DF' },
              ],
            },
            {
              ...dealProducts,
            },
          ],
        },
        false,
      );

      const { retorno: blingOrder } = await this.blingProvider.createOrder(
        xmlBody,
      );

      const { pedido } = blingOrder.pedidos[0];

      Object.assign(pedido, {
        org_name: deal.org_name,
        value: deal.value,
        deal_id: deal.id,
      });

      blingOrders.push({ ...pedido });
    }

    return blingOrders;
  }
}

module.exports = CreateOrderService;
