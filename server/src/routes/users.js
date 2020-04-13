const router = require("express").Router();
const UserController = require("../controller/UserController");

router.get("/", UserController.index);
router.post("/", UserController.store);
router.delete("/:id", UserController.remove);
router.put("/:id", UserController.updateUser);

module.exports = router;
