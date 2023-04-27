import { get, post } from "../../../API";
import {
  addNewtask,
  tasksLoadError,
  tasksLoaded,
  tasksLoading,
  moveTask,
} from "../../actions/tasksAction";

export const fetchTasksOfBoard = () => async (dispatch, getState) => {
  dispatch(tasksLoading());
  try {
    const currentBoardId = getState().boards.currentBoardId;
    const { data } = await get(`board/getAllTasks/${currentBoardId}`);

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
    const validSubtasks = taskInfo.subtasks
      .filter((subtask) => subtask.subtaskValue !== "")
      .map((subtask) => {
        return {
          subtaskValue: subtask.subtaskValue,
        };
      });

    console.log("VALID_SUBTASKS::", validSubtasks);

    const taskData = {
      taskTitle: taskInfo.taskTitle,
      taskDesc: taskInfo.taskDescription,
      trackId: taskInfo.trackId,
      dueDate: taskInfo.dueDate || null,
      subtasks: validSubtasks,
    };

    const { data } = await post(`task/create`, taskData);

    dispatch(addNewtask(data));
  } catch (error) {
    dispatch(tasksLoadError(error));
  }
};

export const moveTaskRequest =
  ({ source, destination, draggableId }) =>
  async (dispatch, getState) => {
    try {
      dispatch(moveTask({ source, destination, draggableId }));
      // get the neighbouring tasks of the task where it is moved to
      const orders = getState().tasks.order;
      const prevTaskId =
        destination.index !== 0
          ? orders[destination.droppableId][destination.index - 1]
          : "";
      const nextTaskId =
        orders[destination.droppableId].length > destination.index + 1
          ? orders[destination.droppableId][destination.index + 1]
          : "";

      const configData = {
        taskId: draggableId,
        trackId: destination.droppableId,
        prevTaskId,
        nextTaskId,
      };
      // eslint-disable-next-line no-unused-vars
      const { data } = await post(`task/moveTask`, configData);
    } catch (error) {
      throw new Error(error);
    }
  };
