const User = require("../models/User");
const bcrypt = require("bcrypt");

// List all users
const index = async (req, res) => {
  const users = await User.findAll();

  if (users) {
    return res.json(users);
  } else {
    res.json({ data: "Not found" });
  }
};

const getOne = async (req, res) => {};

// Create user
const store = (req, res) => {
  let { name, last_name, email, passwd, role } = req.body;

  try {
    User.findOne({
      where: {
        email,
      },
    })
      .then(async (user) => {
        if (!user) {
          const passHashed = bcrypt.hashSync(passwd, 10);
          passwd = passHashed;
          const user = await User.create({
            name,
            last_name,
            email,
            passwd,
            role,
          });

          return res
            .status(201)
            .send(`User ${user.name} has been created with successfully`);
        } else {
          res.status(409).send({ error: "User already exists!" });
        }
      })
      .catch((err) => {
        res.send("error: " + err);
      });
  } catch (err) {
    return res.status(500).send({ error: err });
  }
};

// Remove a user
const remove = async (req, res) => {
  const { id } = req.params;
  try {
    User.findOne({
      where: {
        id,
      },
    }).then(async (user) => {
      if (user) {
        const deleted = await User.destroy({
          where: {
            id,
          },
        });
        if (deleted) {
          return res.status(200).send({ data: `User has been deleted!` });
        }
      } else {
        return res.status(404).send({ error: `User couldn't found` });
      }
    });
  } catch (err) {
    return res.status(500).send({ error: err });
  }
};

// Update a User
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await User.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedUser = await User.findOne({ where: { id } });
      return res.status(200).json({ data: updatedUser });
    } else {
      return res.status(400).send({ error: "User not found" });
    }
  } catch (err) {
    return res.status(500).send({ error: err });
  }
};

module.exports = {
  store,
  index,
  getOne,
  remove,
  updateUser,
};
