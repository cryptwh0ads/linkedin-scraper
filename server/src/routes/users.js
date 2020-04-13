const router = require("express").Router();
const UserController = require("../controller/UserController");

router.post("/", UserController.store);
router.get("/", UserController.index);
router.get("/:id", UserController.getOne);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.remove);

module.exports = router;
