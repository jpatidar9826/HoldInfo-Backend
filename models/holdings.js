const mongoose = require("mongoose");

const HoldingObjSchema = new mongoose.Schema({
  name: { type: String, required: true },
  last: Number,
  buy: Number,
  sell: Number,
  volume: Number,
  base_unit: String,
});

const HoldingsSchema = new mongoose.Schema({
  holding: [HoldingObjSchema],
},{
    timestamps: true,
  }
);

module.exports = mongoose.model("Holdings", HoldingsSchema);
