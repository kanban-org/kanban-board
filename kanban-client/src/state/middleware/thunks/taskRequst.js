import { get, post } from "../../../API";
import {
  addNewtask,
  tasksLoadError,
  tasksLoaded,
  tasksLoading,
} from "../../actions/tasksAction";

export const fetchTasksOfTrack = (trackId) => async (dispatch) => {
  dispatch(tasksLoading());
  try {
    const { data } = await get(`task/getAll/${trackId}`);

    const newTasks = {};

    data.forEach((task) => {
      newTasks[task.id] = task;
    });

    dispatch(tasksLoaded(newTasks));
  } catch (error) {
    dispatch(tasksLoadError(error));
  }
};

export const addNewTaskRequest = (taskInfo) => async (dispatch) => {
  dispatch(tasksLoading());
  try {
    const taskData = {
      taskTitle: taskInfo.taskTitle,
      taskDesc: taskInfo.taskDescription,
      trackId: taskInfo.trackId,
      dueDate: taskInfo.dueDate || null,
    };

    const { data } = await post(`task/create`, taskData);

    dispatch(addNewtask(data));
  } catch (error) {
    dispatch(tasksLoadError(error));
  }
};
