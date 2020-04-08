const router = require("express").Router();

const profile = require("./profile");
const users = require("./users");

router.get("/", (req, res) => res.send(`It's working!`));
router.use("/users", users);
router.use("/profile", profile);

module.exports = router;
