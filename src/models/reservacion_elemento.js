'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reservacion_elemento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  reservacion_elemento.init({
    id_elemento: DataTypes.INTEGER,
    id_reservacion: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'reservacion_elemento',
    timestamps: false,
    updatedAt: false,
    createdAt: false,
  });
  return reservacion_elemento;
};