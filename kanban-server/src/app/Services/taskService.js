import * as Exceptions from '../Exceptions/Exceptions';
import TaskRepository from '../Repository/taskRepository';
import TrackRepository from '../Repository/trackRepository';
import { LexoRank } from 'lexorank';

export default class TaskService {
  constructor() {
    this.taskRepository = new TaskRepository();
    this.trackRepository = new TrackRepository();
  }

  /**
   * Method to create a task
   */
  async createTask(data) {
    const { taskTitle, taskDesc, dueDate, trackId, rank, subtasks } = data;
    try {
      const track = await this.trackRepository.getTrackById(trackId);

      if (!track) {
        throw new Exceptions.NotFoundException('Track not found, cannot create task');
      }

      // generate a new rank value for the new task
      const lastTask = await this.taskRepository.getLastTaskOfTrack(trackId);
      const rank = lastTask
        ? LexoRank.parse(lastTask.rank).genNext().toString()
        : LexoRank.middle().toString();

      let task = await this.taskRepository.createTask({
        taskTitle,
        taskDesc,
        dueDate,
        track,
        rank,
      });
      task.trackId = trackId;

      // create subtasks
      // I have linked subtasks to the task in the database
      // there is a foriegn key in the subtask table that references the task table
      if (subtasks && subtasks.length > 0) {
        // one by by link all the subtasks to the task
        for (let i = 0; i < subtasks.length; i++) {
          const subtask = subtasks[i];
          const subtaskRes = await this.taskRepository.createSubtask({
            subtask: subtask.subtaskValue,
            taskId: task.id,
          });
        }
      }

      return task;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Move task to another track or in the same track
   */
  async moveTask(data) {
    try {
      const { taskId, trackId, prevTaskId = '', nextTaskId = '' } = data;

      // get the track to which the task is to be moved
      const newTrack = await this.trackRepository.getTrackById(trackId);

      // get the task to be moved
      const task = await this.taskRepository.getTaskById(taskId);

      const prevTask = prevTaskId ? await this.taskRepository.getTaskById(prevTaskId) : null;
      const nextTask = nextTaskId ? await this.taskRepository.getTaskById(nextTaskId) : null;

      const prevTaskRank = prevTask ? prevTask.rank : LexoRank.min().toString();
      const nextTaskRank = nextTask ? nextTask.rank : LexoRank.max().toString();
      // console.log(prevTaskRank, nextTaskRank);
      const newRank = LexoRank.parse(prevTaskRank).between(LexoRank.parse(nextTaskRank)).toString();
      // console.log(newRank);
      const updatedTask = await this.taskRepository.updateTask({
        taskId,
        trackId,
        newRank,
      });
      // console.log(updatedTask);
      return updatedTask;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Method to get all tasks of a track
   */
  async getAllTasksOfTrack(trackId) {
    try {
      const track = await this.trackRepository.getTrackById(trackId);

      if (!track) {
        throw new Exceptions.NotFoundException('Track not found, cannot get tasks');
      }

      const tasks = await this.taskRepository.getAllTasksOfTrack(trackId);

      return tasks;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Method to get task by id
   */
  async getTaskById(taskId) {
    try {
      const task = await this.taskRepository.getTaskById(taskId);

      if (!task) {
        throw new Exceptions.NotFoundException('Task not found');
      }

      return task;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Method to update task
   */
  async updateTaskById(taskId, taskTitle, taskDesc, dueDate) {
    try {
      const task = await this.taskRepository.updateTask({ taskId, taskTitle, taskDesc, dueDate });

      if (!task) {
        throw new Exceptions.NotFoundException('Task not found');
      }

      return task;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Method to delete task
   */
  async deleteTaskById(taskId) {
    try {
      await this.taskRepository.deleteTask(taskId);

      return {
        success: true,
        message: 'Task deleted successfully',
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Method to get all subtasks of a task
   */
  async getAllSubtasksOfTask(taskId) {
    try {
      const task = await this.taskRepository.getTaskById(taskId);

      if (!task) {
        throw new Exceptions.NotFoundException('Task not found, cannot get subtasks');
      }

      const subtasks = await this.taskRepository.getAllSubtasksOfTask(taskId);

      return subtasks;
    } catch (error) {
      throw new Error(error);
    }
  }
}
