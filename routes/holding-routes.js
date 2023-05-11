const express = require("express");
const router = express.Router();

const holdingController = require("../controllers/holding-controllers");

router.get("/", holdingController.getAllHoldings); //get holdings

module.exports = router;
