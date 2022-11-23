const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "blockedUsers",
    {
      email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
