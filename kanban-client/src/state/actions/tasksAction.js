import { ACTION_TYPE } from "../action-types";

/* tasks action-creators */
const tasksLoaded = (tasks) => ({
  type: ACTION_TYPE.TASKS_LOADED,
  payload: tasks,
});

const tasksLoading = () => ({
  type: ACTION_TYPE.TASKS_LOADING,
});

const tasksLoadError = (error) => ({
  type: ACTION_TYPE.TASKS_LOAD_ERROR,
  payload: error,
});

const removeTasks = () => ({
  type: ACTION_TYPE.REMOVE_TASKS,
});

const addNewtask = (task) => ({
  type: ACTION_TYPE.ADD_NEW_TASK,
  payload: task,
});

const moveTask = ({ source, destination, draggableId }) => ({
  type: ACTION_TYPE.MOVE_TASK,
  payload: { source, destination, draggableId },
});

export {
  tasksLoaded,
  tasksLoading,
  tasksLoadError,
  removeTasks,
  addNewtask,
  moveTask,
};
