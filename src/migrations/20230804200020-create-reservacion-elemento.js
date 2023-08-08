"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("reservacion_elementos", {
      id_elemento: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      id_reservacion: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("reservacion_elementos");
  },
};
