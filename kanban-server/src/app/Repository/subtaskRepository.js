const { Subtask, sequelize } = require('../../models');

export default class SubtaskRepository {
  async updateSubtasks(subtasks) {
    const t = await sequelize.transaction();
    try {
      const subtask = await Subtask.bulkCreate(subtasks, {
        updateOnDuplicate: ['subtaskDesc', 'status'],
        transaction: t,
      });

      await t.commit();
      return subtask;
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  }
}
