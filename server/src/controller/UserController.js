const User = require("../models/User");

const index = async (req, res) => {
  const users = await User.findAll();

  return res.json(users);
};

const store = async (req, res) => {
  const { name, email } = req.body;

  const user = await User.create({ name, email });

  return res.json(user);
};

module.exports = {
  store,
  index,
};
