'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Tasks', 'rank', {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Tasks', 'rank');
  },
};
