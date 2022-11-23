const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemon",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate: {
          isValidate(id) {
            let regExp = /^[a-zA-Z]{2}\d{4}$/;

            if (!regExp.test(id)) throw "Formato de ID incorrecto";
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hp: {
        type: DataTypes.FLOAT,
      },
      attack: {
        type: DataTypes.FLOAT,
      },
      defense: {
        type: DataTypes.FLOAT,
      },
      speed: {
        type: DataTypes.FLOAT,
      },
      height: {
        type: DataTypes.FLOAT,
      },
      weight: {
        type: DataTypes.FLOAT,
      },
      image: {
        type: DataTypes.TEXT,
        get() {
          return [this.getDataValue("image")];
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
