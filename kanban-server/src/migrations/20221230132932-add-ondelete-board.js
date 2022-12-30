'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // on deleting a board, delete all tracks associated with it
    await queryInterface.removeConstraint('Tracks', 'Tracks_boardId_fkey');

    await queryInterface.addConstraint('Tracks', {
      fields: ['boardId'],
      type: 'foreign key',
      name: 'Tracks_boardId_fkey',
      references: {
        //Required field
        table: 'Boards',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('Tracks', 'Tracks_boardId_fkey');

    await queryInterface.addConstraint('Tracks', {
      fields: ['boardId'],
      type: 'foreign key',
      name: 'Tracks_boardId_fkey',
      references: {
        //Required field
        table: 'Boards',
        field: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'no action',
    });
  },
};
