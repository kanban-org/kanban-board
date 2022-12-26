import Controller from './controller';
import * as Exceptions from '../Exceptions/Exceptions';
import TaskService from '../Services/taskService';

export default class TaskController extends Controller {
  constructor(response) {
    super(response);
    this.taskService = new TaskService();
  }

  async createTask(request) {}
}
