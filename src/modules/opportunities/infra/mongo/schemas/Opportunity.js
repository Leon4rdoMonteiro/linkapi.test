const { Schema, model } = require('mongoose');

const OpportunitySchema = new Schema(
  {
    deals: Array({
      deal_id: {
        type: String,
        require: true,
      },
      order_id: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
    }),
    total: {
      type: Number,
    },
  },
  { timestamps: true },
);

module.exports = model('Opportunity', OpportunitySchema);
