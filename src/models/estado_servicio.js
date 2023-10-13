'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class estado_servicio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  estado_servicio.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'estado_servicio',
    timestamps: false,
    updatedAt: false,
  });
  return estado_servicio;
};