const router = require("express").Router();
const UserController = require("../controller/UserController");

router.get("/", UserController.index);
router.post("/", UserController.store);

module.exports = router;
