const router = require("express").Router();
const controller = require("../controller/profile");

router.post("/", controller.getProfileInfo());

module.exports = router;
