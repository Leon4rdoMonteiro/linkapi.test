const { isSameDay } = require('date-fns');
const { v4: uuid } = require('uuid');

class FakeOpportunityRepository {
  opportunities = []

  async create(order) {
    const { deal_id, idPedido, value, org_name } = order;

    const now = new Date();

    const opportunity = {
      _id: uuid(),
      deals: [
        {
          deal_id,
          order_id: idPedido,
          name: org_name,
          value,
        },
      ],
      total: value,
      createdAt: now,
      updatedAt: now,
      _v: 0,
    };

    this.opportunities.push(opportunity);

    return opportunity;
  }

  async updateOpportunities({ id, orders }) {
    const opportunity = this.opportunities.find(item => item._id === id);

    let { total } = opportunity;

    for (const order of orders) {
      const { deal_id, idPedido, value, org_name } = order;

      opportunity.deals.push({
        deal_id,
        order_id: idPedido,
        name: org_name,
        value,
      });

      total += order.value;

      opportunity.total = total;
    }
  }

  async findTodayRecord() {
    const today = new Date();

    const found = this.opportunities.find(({ createdAt }) =>
      isSameDay(createdAt, today),
    );

    return found;
  }

  async findByDeal(id) {
    const today = new Date();

    const foundOpportunity = this.opportunities.find(opportunity => {
      const { deals, createdAt } = opportunity;

      const foundDeal = deals.find(deal => deal.deal_id === id);

      const isTodayRecord = isSameDay(today, createdAt);

      return foundDeal && isTodayRecord ? opportunity : null;
    });

    return foundOpportunity;
  }

  async getAll(date) {
    let found = this.opportunities;

    if (date) {
      found = this.opportunities.filter(({ createdAt }) =>
        isSameDay(date, createdAt),
      );
    }

    return found;
  }
}

module.exports = FakeOpportunityRepository;
