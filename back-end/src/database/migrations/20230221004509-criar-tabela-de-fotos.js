'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('fotos', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      originalname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      aluno_id :{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'alunos',
          key: 'id'
        },
        onDelete: 'SET NULL', 
        //SE APAGAR ALUNO APAGA TODAS FOTOS;
        //'SET NULL' NÃO APAGA E TIRA O ID
        onUpdate: 'CASCADE', //Se alterar um id aluno atualiza nas fotos.
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('fotos');
  }
};
