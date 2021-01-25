const { startOfDay, endOfDay, parseISO } = require('date-fns');

const Opportunity = require('../infra/mongo/schemas/Opportunity');

class OpportunityRepository {
  async create(order) {
    const { deal_id, idPedido, value, org_name } = order;

    const opportunity = await Opportunity.create({
      deals: [
        {
          deal_id,
          order_id: idPedido,
          name: org_name,
          value,
        },
      ],
      total: value,
    });

    return opportunity;
  }

  async updateOpportunities({ id, orders }) {
    const opportunities = [];

    for (const order of orders) {
      const { deal_id, idPedido, value, org_name } = order;

      const opportunity = await Opportunity.updateOne(
        { _id: id },
        {
          $push: {
            deals: {
              deal_id,
              order_id: idPedido,
              name: org_name,
              value,
            },
          },
          $inc: {
            total: value,
          },
        },
      );

      opportunities.push(opportunity);
    }

    return opportunities;
  }

  async findTodayRecord() {
    const today = new Date();
    const start_day = startOfDay(today);
    const end_day = endOfDay(today);

    const opportunities = await Opportunity.findOne({
      createdAt: {
        $gte: start_day,
        $lte: end_day,
      },
    });

    return opportunities;
  }

  async findByDeal(deal_id) {
    const today = new Date();
    const start_day = startOfDay(today);
    const end_day = endOfDay(today);

    const opportunity = await Opportunity.findOne({
      'deals.deal_id': deal_id,
      createdAt: {
        $gte: start_day,
        $lte: end_day,
      },
    });

    return opportunity;
  }

  async getAll(date) {
    let query = {};

    if (date) {
      const parsedDate = parseISO(date);
      const start_day = startOfDay(parsedDate);
      const end_day = endOfDay(parsedDate);

      query = {
        createdAt: {
          $lte: end_day,
          $gte: start_day,
        },
      };
    }

    const opportunities = await Opportunity.find(query);

    return opportunities;
  }
}

module.exports = OpportunityRepository;
