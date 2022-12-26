import express from 'express';
import TaskController from '../app/Controllers/taskController';
const TaskApiRouter = express.Router();

// Create Track
TaskApiRouter.post('/track/create', (req, res) => {
  const taskController = new TaskController(res);
  taskController.createTrack(req);
});

export default TaskApiRouter;
