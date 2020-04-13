const express = require("express");

const routes = express.Router();

const users = require("./users");
const profile = require("./profile");

routes.get("/", (req, res) => {
  return res.json({ data: "It's working!" });
});
routes.use("/profile", profile);
routes.use("/users", users);

module.exports = routes;
