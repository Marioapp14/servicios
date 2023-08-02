"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class reservacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      
    }
  }
  reservacion.init(
    {
      fecha_inicio: DataTypes.DATE,
      fecha_fin: DataTypes.DATE,
      id_estado: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "reservacion",
      timestamps: false,
      createdAt: false, // Indica que no existe la columna createdAt
      updatedAt: false,
    }
  );
  return reservacion;
};
