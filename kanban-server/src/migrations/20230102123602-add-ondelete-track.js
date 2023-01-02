'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    // on deleting a track, delete all tasks associated with it
    await queryInterface.removeConstraint('Tasks', 'Tasks_trackId_fkey');

    await queryInterface.addConstraint('Tasks', {
      fields: ['trackId'],
      type: 'foreign key',
      name: 'Tasks_trackId_fkey',
      references: {
        //Required field
        table: 'Tracks',
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
    await queryInterface.removeConstraint('Tasks', 'Tasks_trackId_fkey');

    await queryInterface.addConstraint('Tasks', {
      fields: ['trackId'],
      type: 'foreign key',
      name: 'Tasks_trackId_fkey',
      references: {
        //Required field
        table: 'Tracks',
        field: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'no action',
    });
  },
};
