const express = require("express");

const routes = express.Router();

const users = require("./users");

routes.get("/", (req, res) => {
  return res.json({ data: "It's working!" });
});
routes.use("/users", users);

module.exports = routes;
