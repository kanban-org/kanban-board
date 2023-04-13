'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn('Tasks', 'trackId', {
      type: Sequelize.UUIDV4,
      references: {
        model: 'Tracks',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE', // Add this line
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('Tasks', 'trackId', {
      type: Sequelize.UUIDV4,
      references: {
        model: 'Tracks',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT', // Modify this line if needed
    });
  },
};
