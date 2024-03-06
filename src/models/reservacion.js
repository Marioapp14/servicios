"use strict";
const { Model } = require("sequelize");
const moment = require("moment");
module.exports = (sequelize, DataTypes) => {
  class reservacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      reservacion.belongsTo(models.estado_reservacion, {
        foreignKey: "id_estado_reservacion",
      });

      reservacion.hasMany(models.reservacion_elemento, {
        foreignKey: "id_reservacion",
      });

      reservacion.hasMany(models.servicio_reservacion, {
        foreignKey: "id_reservacion",
        references: {
          model: "servicio_reservacion",
          key: "id_reservacion",
        },
      });
    }
  }
  reservacion.init(
    {
      fecha_inicio: {
        type: DataTypes.DATEONLY,
      },
      hora_inicio: DataTypes.TIME,
      hora_fin: DataTypes.TIME,
      fecha_fin: {
        type: DataTypes.DATEONLY,
      },
      id_solicitante: DataTypes.INTEGER,
      observacion: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "reservacion",
      timestamps: false,
      updatedAt: false,
      createdAt: false,
    }
  );
  return reservacion;
};
