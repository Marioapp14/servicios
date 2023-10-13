'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class estado_reservacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  estado_reservacion.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'estado_reservacion',
    timestamps: false,
    updatedAt: false,
    createdAt: false,
  });
  return estado_reservacion;
};