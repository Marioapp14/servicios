"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("servicio_reservacions", {
      id_reservacion: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_servicio: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("servicio_reservacions");
  },
};
