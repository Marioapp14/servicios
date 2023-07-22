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

      reservacion.belongsTo(models._estadoreservacion, {
        foreignKey: "id_estado",
        onDelete: 'CASCADE'
      });
      reservacion.hasMany(models.reservacion_elemento, {
        foreignKey: "id_elemento",
        onDelete: 'CASCADE'
      });
      reservacion.hasMany(models.reservacion_elemento, {
        foreignKey: "id_reservacion",
        onDelete: 'CASCADE'
      });
      reservacion.hasMany(models.servicio_reservacion, {
        foreignKey: "id_reservacion",
        onDelete: 'CASCADE'
      });
      reservacion.hasMany(models.servicio_reservacion, {
        foreignKey: "id_servicio",
        onDelete: 'CASCADE'
      });

      
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
