"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("reservaciones", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      fecha_inicio: {
        type: Sequelize.DATE,    
      },
      id_solicitante: {
        type: Sequelize.INTEGER,
      },
      fecha_fin: {
        type: Sequelize.DATE,
      },
      id_estado_reservacion: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("reservaciones");
  },
};
