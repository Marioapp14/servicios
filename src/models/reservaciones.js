"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class reservaciones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      reservaciones.belongsTo(models.estado_reservacion, {
        foreignKey: "id",
        references: {
          model: "estado_reservacion",
          key: "id",
        },
      });

      // reservaciones.belongsTo(models.servicio_reservacion, {
      //   foreignKey: "id",
      //   references: {
      //     model: "servicio_reservacion",
      //     key: "id_reservacion",
      //   },
      //   targetKey: "id",
      // });

      reservaciones.hasMany(models.reservacion_elemento, {
        foreignKey: "id_reservacion",
        references: {
          model: "reservacion_elemento",
          key: "id_reservacion",
        },
      });
    }
  }
  reservaciones.init(
    {
      fecha_inicio: DataTypes.DATE,
      fecha_fin: DataTypes.DATE,
      id_estado_reservacion: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "reservaciones",
      timestamps: false,
      createdAt: false, // Indica que no existe la columna createdAt
      updatedAt: false,
    }
  );
  return reservaciones;
};
