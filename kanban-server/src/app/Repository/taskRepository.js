const { Task, Subtask, sequelize } = require('../../models');

export default class TaskRepository {
  async createTask(data) {
    const { taskTitle, taskDesc, dueDate, track, rank } = data;
    const task = await Task.create({
      taskTitle,
      taskDesc,
      dueDate,
      rank,
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

  async updateTask(data) {
    const { taskId, taskTitle, taskDesc, dueDate, trackId, newRank } = data;
    const task = await this.getTaskById(taskId);

    task.taskTitle = taskTitle || task.taskTitle;
    task.taskDesc = taskDesc || task.taskDesc;
    task.dueDate = dueDate || task.dueDate;
    task.rank = newRank || task.rank;

    try {
      if (trackId) {
        await task.setTrack(trackId);
      }
    } catch (error) {
      throw new Error(error);
    }

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

  async getLastTaskOfTrack(trackId) {
    const lastTask = await Task.findOne({
      where: {
        trackId: trackId,
      },
      order: [['rank', 'DESC']],
    });
    return lastTask;
  }

  async getNeighbourTasks(task, trackId) {
    const prevTask = await Task.findOne({
      where: {
        trackId: trackId,
        rank: {
          [Op.lt]: task.rank,
        },
      },
      order: [['rank', 'DESC']],
    });

    const nextTask = await Task.findOne({
      where: {
        trackId: trackId,
        rank: {
          [Op.gt]: task.rank,
        },
      },
      order: [['rank', 'ASC']],
    });

    return [prevTask, nextTask];
  }

  async createSubtask({ subtask, taskId }) {
    const task = await this.getTaskById(taskId);
    const newSubtask = await Subtask.create({
      subtaskDesc: subtask,
    });
    await task.addSubtask(newSubtask);

    return newSubtask;
  }

  async getAllSubtasksOfTask(taskId) {
    const subtasks = await Subtask.findAll({
      where: {
        taskId: taskId,
      },
    });

    if (!subtasks) {
      throw new Error('Error in getting subtasks');
    }

    return subtasks;
  }
}
