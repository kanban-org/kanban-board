const { Task, sequelize } = require('../../models');

export default class TaskRepository {
  async createTask(taskTitle, taskDesc, dueDate, track) {
    const task = await Task.create({
      taskTitle,
      taskDesc,
      dueDate,
    });

    await track.addTask(task);

    return task;
  }

  async getAllTasksOfTrack(trackId) {
    const tasks = await Task.findAll({
      where: {
        trackId: trackId,
      },
    });

    if (!tasks) {
      throw new Error('Error in getting tasks');
    }

    return tasks;
  }

  async getTaskById(taskId) {
    const task = await Task.findOne({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      throw new Error('Error in fetching task');
    }

    return task;
  }

  async updateTask(taskId, taskTitle, taskDesc, dueDate) {
    const task = await this.getTaskById(taskId);

    task.taskTitle = taskTitle || task.taskTitle;
    task.taskDesc = taskDesc || task.taskDesc;
    task.dueDate = dueDate || task.dueDate;

    const updatedTask = await task.save();

    if (!updatedTask) {
      throw new Error('Error in updating task');
    }

    return updatedTask;
  }

  async deleteTask(taskId) {
    try {
      await sequelize.transaction(async (t) => {
        const task = await Task.findOne({
          where: {
            id: taskId,
          },
          transaction: t,
        });

        if (!task) {
          throw new Error('Error in fetching Track');
        }

        await task.destroy({ transaction: t });
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
