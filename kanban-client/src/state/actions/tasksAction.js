import { ACTION_TYPE } from "../action-types";

/* tasks action-creators */
export const tasksLoaded = (tasks) => ({
  type: ACTION_TYPE.TASKS_LOADED,
  payload: tasks,
});

export const tasksLoading = () => ({
  type: ACTION_TYPE.TASKS_LOADING,
});

export const tasksLoadError = (error) => ({
  type: ACTION_TYPE.TASKS_LOAD_ERROR,
  payload: error,
});

export const removeTasks = () => ({
  type: ACTION_TYPE.REMOVE_TASKS,
});

export const addNewtask = (task) => ({
  type: ACTION_TYPE.ADD_NEW_TASK,
  payload: task,
});

export const moveTask = ({ source, destination, draggableId }) => ({
  type: ACTION_TYPE.MOVE_TASK,
  payload: { source, destination, draggableId },
});
