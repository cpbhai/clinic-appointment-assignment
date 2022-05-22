const express = require("express");
const router = express.Router();

router.use("/user", require("./user"));
router.use("/appointment", require("./appointment"));

module.exports = router;
