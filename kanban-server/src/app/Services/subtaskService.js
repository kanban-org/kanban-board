import * as Exceptions from '../Exceptions/Exceptions';
import SubtaskRepository from '../Repository/subtaskRepository';
import TaskRepository from '../Repository/taskRepository';

export default class SubtaskService {
  constructor() {
    this.subtaskRepository = new SubtaskRepository();
    this.taskRepository = new TaskRepository();
  }

  /**
   * Method to update subtask
   */
  async updateSubtasks(taskId, subtasks) {
    try {
      const task = await this.taskRepository.getTaskById(taskId);

      if (!task) {
        throw new Exceptions.NotFoundException('Task not found');
      }

      const resSubtasks = await this.subtaskRepository.updateSubtasks(subtasks);

      if (resSubtasks.length !== subtasks.length) {
        throw new Exceptions.ConflictException('all subtasks not updated');
      }

      return resSubtasks;
    } catch (error) {
      throw new Error(error);
    }
  }
}
