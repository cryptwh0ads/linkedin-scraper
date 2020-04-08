const connDev = {
  client: "sqlite3",
  connection: {
    filename: "./dbDev.sqlite",
  },
  useNullAsDefault: true,
};

module.exports = { connDev };
