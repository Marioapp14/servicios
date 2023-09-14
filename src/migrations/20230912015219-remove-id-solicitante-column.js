'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn("servicios", "id_solicitante");
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn("servicios", "id_solicitante", {
      type: Sequelize.INTEGER,
    });
  }
};
