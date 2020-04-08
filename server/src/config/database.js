module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "docker",
  database: "pgDev",
  define: {
    timestamps: true,
    underscored: true,
  },
};
