"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("servicios", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      descripcion: {
        type: Sequelize.STRING,
      },
      id_tipo: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      id_estado_servicio: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("servicios");
  },
};
