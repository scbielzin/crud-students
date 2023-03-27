const bcryptjs =  require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users', 
      [{
        nome: 'Gabriel Arthur',
        email: 'zingabrielctt@gmail.com',
        password_hash: await bcryptjs.hash('gabriel321', 8),
        instagram: 'bielzinonthetrack',
        telefone: '47 98848 2219',
        nascimento: '2000-11-11',
        created_at: new Date(),
        updated_at: new Date(),
      }], {});
  },

  async down () {
  }
};
