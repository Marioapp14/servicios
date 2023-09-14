"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tipo_servicio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tipo_servicio.hasMany(models.servicio, {
        foreignKey: "id_tipo",
        sourceKey: "id", // Clave primaria de tipo_servicio
      });
    }
  }
  tipo_servicio.init(
    {
      nombre: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "tipo_servicio",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  return tipo_servicio;
};
