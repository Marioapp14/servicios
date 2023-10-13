'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class servicio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      servicio.belongsTo(models.tipo_servicio, {
        foreignKey: "id_tipo",
      });
      servicio.belongsTo(models.estado_servicio, {
        foreignKey: "id_estado_servicio",
      });
    }
  }
  servicio.init({
    descripcion: DataTypes.STRING,
    id_tipo: DataTypes.INTEGER,
    id_estado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'servicio',
    timestamps: false,
    updatedAt: false,
    createdAt: false,
  });
  return servicio;
};