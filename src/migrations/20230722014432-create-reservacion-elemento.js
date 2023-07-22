'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reservacion_elementos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_elemeno: {
        type: Sequelize.INTEGER
      },
      id_reservacion: {
        type: Sequelize.INTEGER
      },
 
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reservacion_elementos');
  }
};