const User = require("../models/User");
const bcrypt = require("bcrypt");

const index = async (req, res) => {
  const users = await User.findAll();

  if (users) {
    return res.json(users);
  } else {
    res.json({ data: "Not found" });
  }
};

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
    return res.status(400).send({ error: err });
  }
};

module.exports = {
  store,
  index,
};
