'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('servicio_reservacions', {
      id_reservacion: {
        type: Sequelize.INTEGER
      },
      id_servicio: {
        type: Sequelize.INTEGER,
        references: {
          model: 'servicios',
          key: 'id'
        }
      }

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('servicio_reservacions');
  }
};