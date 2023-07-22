'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('servicios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      id_solicitante: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      descripcion: {
        type: Sequelize.STRING
        
      },
      id_tipo: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'tipo_servicios',
          key: 'id'
        }
      },
      id_estado: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'estado_servicios',
          key: 'id'
        }
      },
      
    },
    {
      timestamps: false,
    }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('servicios');
  }
};