const { v4: uuid } = require('uuid');

module.exports = {
  create: {
    deal_id: uuid(),
    order_id: uuid(),
    name: 'LinkApi',
    value: '1000000',
  },
};
