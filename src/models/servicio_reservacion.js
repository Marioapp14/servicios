"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class servicio_reservacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      servicio_reservacion.belongsTo(models.reservaciones, {
        foreignKey: "id_reservacion",
        references: {
          model: "reservaciones",
          key: "id",
        },
      });
      servicio_reservacion.belongsTo(models.servicio, {
        foreignKey: "id_servicio",
        references: {
          model: "servicio",
          key: "id",
        },
      });
    }
  }
  servicio_reservacion.init(
    {
      id_reservacion: DataTypes.INTEGER,
      id_servicio: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "servicio_reservacion",
      timestamps: false,
      createdAt: false, // Indica que no existe la columna createdAt
      updatedAt: false,
    }
  );
  return servicio_reservacion;
};
