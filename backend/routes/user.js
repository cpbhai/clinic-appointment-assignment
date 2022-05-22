const express = require("express");
const router = express.Router();
const { signup, login, loadUser } = require("../controllers/user.js");
const { isAuthenticated } = require("../middlewares/auth");

router.post("/signup", signup);
router.post("/login", login);
router.get("/load-user", isAuthenticated, loadUser);

module.exports = router;
