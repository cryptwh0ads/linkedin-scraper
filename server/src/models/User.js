const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        passwd: DataTypes.STRING,
        role: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
  }
}

module.exports = User;
