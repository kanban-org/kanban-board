import * as Exceptions from '../Exceptions/Exceptions';
import TaskRepository from '../Repository/taskRepository';
import TrackRepository from '../Repository/trackRepository';

export default class TaskService {
  constructor() {
    this.taskRepository = new TaskRepository();
    this.trackRepository = new TrackRepository();
  }

  /**
   * Method to create a task
   */
  async createTask(taskTitle, taskDesc, dueDate, trackId) {
    try {
      const track = await this.trackRepository.getTrackById(trackId);

      if (!track) {
        throw new Exceptions.NotFoundException('Track not found, cannot create task');
      }

      let task = await this.taskRepository.createTask(taskTitle, taskDesc, dueDate, track);
      task.trackId = trackId;

      return task;
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
      const task = await this.taskRepository.updateTask(taskId, taskTitle, taskDesc, dueDate);

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
}
