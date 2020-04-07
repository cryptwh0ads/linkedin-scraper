const router = require("express").Router();
const controller = require("../controller/profile");

router.get("/", controller.get());

module.exports = router;
