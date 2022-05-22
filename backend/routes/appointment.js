const express = require("express");
const router = express.Router();
const { create, get } = require("../controllers/appointment.js");
const { isAuthenticated } = require("../middlewares/auth");

router.post("/create", isAuthenticated, create);
router.get("/get", isAuthenticated, get);

module.exports = router;
