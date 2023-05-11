require("dotenv").config();
const mongoose = require("mongoose");
const axios = require("axios");

const Holdings = require("../models/holdings");

const getAllHoldings = async (req, res, next) => {
  var config = {
    method: "get",
    url: "https://api.wazirx.com/api/v2/tickers",
    headers: {},
  };
  let results = [];
  await axios(config)
    .then((response) => {
      let objectArray = Object.entries(response.data);
      objectArray = objectArray.slice(0, 10);

      for (let index = 0; index < 10; index++) {
        const element = {
          name: objectArray[index][0],
          last: objectArray[index][1].last,
          buy: objectArray[index][1].buy,
          sell: objectArray[index][1].sell,
          volume: objectArray[index][1].volume,
          base_unit: objectArray[index][1].base_unit,
        };

        results.push(element);
      }
    })
    .catch((error) => {
      return res
      .status(500)
      .json({ msg: "Fetching Holdings failed, please try again later."});
    });

  const newHolding = new Holdings({
    holding: results,
  });

  try {
    await newHolding.save();
  } catch (err) {
    return res.status(500).json({ msg: "Fetching Holdings failed, please try again later." });
  }

  let getHolding;

  Holdings.findOne()
    .sort({ createdAt: -1 }) // Getting most recent entry
    .exec()
    .then((latestEntry) => {
      res.status(200).json({ holdings: latestEntry.holding });
    })
    .catch((error) => {
      return res.status(500).json({ msg: "Fetching Holdings failed, please try again later." });
    });
};

exports.getAllHoldings = getAllHoldings;
