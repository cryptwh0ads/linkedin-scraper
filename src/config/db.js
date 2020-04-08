const bcrypt = require("bcrypt");
const { connDev } = require("./index");
const knex = require("knex")(connDev);

const initDB = async () => {
  const userExist = await knex.schema.hasTable("users");

  if (!userExist) {
    await knex.schema.createTable("users", (table) => {
      table.bigIncrements("id").primary();
      table.string("name");
      table.string("email");
      table.string("passwd");
      table.string("socialEmail");
      table.string("socialPasswd");
      table.string("role");
    });
  }

  let hash = bcrypt.hashSync("kivalita@2020", 10);

  const totalUsers = await knex("users").select(knex.raw("count(*) as total"));

  if (totalUsers[0].total === 0) {
    await knex
      .insert({
        name: "Admin",
        email: "admin@admin.com",
        passwd: hash,
        role: "admin",
      })
      .into("users");

    await knex
      .insert({
        name: "User",
        email: "user@user.com",
        passwd: hash,
        role: "user",
      })
      .into("users");
  }
};

initDB();

module.exports = knex;
