const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      image: {
        type: DataTypes.STRING,
      },
      isAdmin: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.email === process.env.ADMIN;
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
