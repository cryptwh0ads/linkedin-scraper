const router = require("express").Router();
const controller = require("../controller/ProfileController");

router.post("/", controller.getInfo());

module.exports = router;
