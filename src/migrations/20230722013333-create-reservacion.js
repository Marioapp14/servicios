"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "reservacions",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        fecha_inicio: {
          type: Sequelize.DATE,
        },
        fecha_fin: {
          type: Sequelize.DATE,
        },
        id_estado: {
          type: Sequelize.INTEGER,
        },
      },
      {
        timestamps: false,
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("reservacions");
  },
};
