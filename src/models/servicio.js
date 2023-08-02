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
      
      
      // define association here
      
    }
  }
  servicio.init({
    nombre: DataTypes.STRING,
    id_solicitante: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    id_tipo: DataTypes.INTEGER,
    id_estado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'servicio',
    timestamps: false,
    createdAt: false, // Indica que no existe la columna createdAt
    updatedAt: false,
  });
  return servicio;
};