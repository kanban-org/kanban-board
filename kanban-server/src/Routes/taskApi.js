import express from 'express';
import TaskController from '../app/Controllers/taskController';
const TaskApiRouter = express.Router();

// Create Track
TaskApiRouter.post('/task/create', (req, res) => {
  const taskController = new TaskController(res);
  taskController.createTask(req);
});

// Get all tasks for a track
TaskApiRouter.get('/task/getAll/:trackId', (req, res) => {
  const taskController = new TaskController(res);
  taskController.getAllTasksOfTrack(req);
});

// Get task by id
TaskApiRouter.get('/task/:taskId', (req, res) => {
  const taskController = new TaskController(res);
  taskController.getTaskById(req);
});

// Update task by id
TaskApiRouter.patch('/task/update/:taskId', (req, res) => {
  const taskController = new TaskController(res);
  taskController.updateTaskById(req);
});

// Delete task by id
TaskApiRouter.delete('/task/delete/:taskId', (req, res) => {
  const taskController = new TaskController(res);
  taskController.deleteTaskById(req);
});

// move task
TaskApiRouter.post('/task/moveTask', (req, res) => {
  const taskController = new TaskController(res);
  taskController.moveTask(req);
});

export default TaskApiRouter;
