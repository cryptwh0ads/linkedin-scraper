const router = require("express").Router();
const controller = require("../controller/ProfileController");

router.post("/:profileName", controller.getProfileInfo());

module.exports = router;
