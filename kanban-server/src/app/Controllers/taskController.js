import Controller from './controller';
import * as Exceptions from '../Exceptions/Exceptions';
import TaskService from '../Services/taskService';

export default class TaskController extends Controller {
  constructor(response) {
    super(response);
    this.taskService = new TaskService();
  }

  /**
   * Create a task
   * @param {Object} request - { `taskTitle`, `taskDesc`, `dueDate`, `trackId` }
   * @returns {Object} - Task object
   */
  async createTask(request) {
    try {
      const resTask = await this.taskService.createTask(request.body);

      if (!resTask) {
        throw new Exceptions.NotFoundException('Task not created');
      }

      this.sendResponse(resTask);
    } catch (error) {
      this.handleException(error);
    }
  }

  /**
   * Get all tasks of a track
   * @param {Object} request - { `trackId` }
   * @returns {Object} - Tasks object
   */
  async getAllTasksOfTrack(request) {
    const { trackId } = request.params;
    try {
      const resTasks = await this.taskService.getAllTasksOfTrack(trackId);

      if (!resTasks) {
        throw new Exceptions.NotFoundException('Tasks not found');
      }

      this.sendResponse(resTasks);
    } catch (error) {
      this.handleException(error);
    }
  }

  /**
   * Get task by id
   * @param {Object} request - { `taskId` }
   * @returns {Object} - Task object
   */
  async getTaskById(request) {
    const { taskId } = request.params;
    try {
      const resTask = await this.taskService.getTaskById(taskId);

      if (!resTask) {
        throw new Exceptions.NotFoundException('Task not found');
      }

      this.sendResponse(resTask);
    } catch (error) {
      this.handleException(error);
    }
  }

  /**
   * Update task by id
   * @param {Object} request - { `taskId`, `taskTitle`, `taskDesc`, `dueDate` }
   * @returns {Object} - Task object
   */
  async updateTaskById(request) {
    const { taskId } = request.params;
    const { taskTitle, taskDesc, dueDate } = request.body;
    try {
      const resTask = await this.taskService.updateTaskById(taskId, taskTitle, taskDesc, dueDate);

      if (!resTask) {
        throw new Exceptions.NotFoundException('Task not found');
      }

      this.sendResponse(resTask);
    } catch (error) {
      this.handleException(error);
    }
  }

  /**
   * Delete task by id
   * @param {Object} request - { `taskId` }
   * @returns {Object} - Task object
   */
  async deleteTaskById(request) {
    const { taskId } = request.params;
    try {
      const resTask = await this.taskService.deleteTaskById(taskId);

      if (!resTask) {
        throw new Exceptions.NotFoundException('Task not found');
      }

      this.sendResponse(resTask);
    } catch (error) {
      this.handleException(error);
    }
  }

  /**
   * Move Task
   * @param {Object} requestBody - {`taskId`, `trackId`, `prevTaskId`, `nextTaskId`}
   * @return {Object} - Task object
   */
  async moveTask(request) {
    try {
      const resTask = await this.taskService.moveTask(request.body);

      if (!resTask) {
        throw new Exceptions.NotFoundException('Task not moved');
      }

      this.sendResponse(resTask);
    } catch (error) {
      this.handleException(error);
    }
  }

  /**
   * get all subtasks of a task
   * @param {Object} request - {`taskId`}
   * @return {Object} - Array of subtasks
   */
  async getAllSubtasksOfTask(request) {
    const { taskId } = request.params;
    try {
      const resSubtasks = await this.taskService.getAllSubtasksOfTask(taskId);

      if (!resSubtasks) {
        throw new Exceptions.NotFoundException('Subtasks not found');
      }

      this.sendResponse(resSubtasks);
    } catch (error) {
      this.handleException(error);
    }
  }
}
