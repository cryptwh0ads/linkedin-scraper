const router = require("express").Router();
const UserController = require("../controller/UserController");

router.get("/", UserController.index);
router.post("/", UserController.store);
router.delete("/:id", UserController.remove);

module.exports = router;
