const router = require("express").Router();

const profile = require("./profile");

router.get("/", (req, res) => res.send(`It's working!`));
router.use("/profile", profile);

module.exports = router;
