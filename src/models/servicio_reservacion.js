'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class servicio_reservacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  servicio_reservacion.init({
    id_reservacion: DataTypes.INTEGER,
    id_servicio: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'servicio_reservacion',
  });
  return servicio_reservacion;
};