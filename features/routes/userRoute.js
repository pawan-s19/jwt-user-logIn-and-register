var express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
var router = express.Router();

/* POST /registerUser */
router.post("/registeruser", registerUser);

/* POST /login */
router.post("/login", loginUser);
module.exports = router;
