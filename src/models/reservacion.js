'use strict';
const {
  Model
} = require('sequelize');
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
        references: {
          model: "reservacion_elemento",
          key: "id_reservacion",
        },
      });
    }
  }
  reservacion.init({
    fecha_inicio: DataTypes.DATE,
    id_solicitante: DataTypes.INTEGER,
    fecha_fin: DataTypes.DATE,
    observacion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'reservacion',
    timestamps: false,
    updatedAt: false,
    createdAt: false,
  });
  return reservacion;
};