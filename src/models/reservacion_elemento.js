"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class reservacion_elemento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      reservacion_elemento.belongsTo(models.reservacion, {
        foreignKey: "id_reservacion",
        onDelete: "CASCADE",
      });
    }
  }
  reservacion_elemento.init(
    {
      id_elemeno: DataTypes.INTEGER,
      id_reservacion: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "reservacion_elemento",
      timestamps: false,
      createdAt: false, // Indica que no existe la columna createdAt
      updatedAt: false,
    }
  );
  return reservacion_elemento;
};
