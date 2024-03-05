'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reservacions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha_inicio: {
        type: Sequelize.DATEONLY
      },
      hora_inicio: {
        type: Sequelize.TIME
      },
      hora_fin: {
        type: Sequelize.TIME
      },
      fecha_fin: {
        type: Sequelize.DATEONLY
      },
      id_solicitante: {
        type: Sequelize.INTEGER
      },
      observacion: {
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reservacions');
  }
};