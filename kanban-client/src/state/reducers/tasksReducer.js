import { addTaskInTrackOrder } from "../../utils";
import { ACTION_TYPE } from "../action-types";

const initialState = {
  entities: {},
  status: "idle",
  error: null,
  order: {},
};

/*
order = {
  <TRACK_ID_1> : [ <TASK_ID_1>, <TASK_ID_2>, <TASK_ID_3> ], -> order of tasks
  <TRACK_ID_2> : [ <TASK_ID_3>, <TASK_ID_4>, <TASK_ID_5> ]
}

tasks = {
  <TASK_ID_1> : {
    id: "aljcnac",
    taskName: "naming"
    trackId: <TRACK_ID_1>
  },
  <TASK_ID_2> : {
    id: "aljcnac",
    taskName: "naming"
    trackId: <TRACK_ID_2>
  },
}
*/

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPE.TASKS_LOADED: {
      const tasks = action.payload;

      // Create a Map to store the track order
      const order = new Map();

      // Loop through all the loaded tasks
      // Loop through all the loaded tasks
      Object.values(tasks).forEach((task) => {
        const trackId = task.trackId;

        // If the track doesn't have any tasks yet, create a new array with the current task
        if (!order.has(trackId)) {
          order.set(trackId, [task.id]);
          return;
        }

        // Otherwise, find the index where the new task should be inserted based on its lexorank using binary search
        const trackOrder = order.get(trackId);
        const insertIndex = addTaskInTrackOrder(trackOrder, task, tasks);

        // Insert the new task at the correct index
        trackOrder.splice(insertIndex, 0, task.id);
      });

      return {
        ...state,
        entities: {
          ...state.entities,
          ...tasks,
        },
        order: Object.fromEntries(order),
      };
    }

    case ACTION_TYPE.ADD_NEW_TASK: {
      const task = action.payload;
      // Check if the track already exists in the order object
      const trackId = task.trackId;
      const trackOrder = state.order[trackId] || [];

      // Add the task ID to the track's order
      const updatedOrder = {
        ...state.order,
        [trackId]: [...trackOrder, task.id],
      };

      return {
        ...state,
        entities: {
          ...state.entities,
          [task.id]: task,
        },
        order: updatedOrder,
      };
    }
    case ACTION_TYPE.UPDATE_TASK: {
      const task = action.payload;
      return {
        ...state,
        entities: {
          ...state.entities,
          [task.id]: task,
        },
      };
    }
    case ACTION_TYPE.UPDATE_SUBTASKS: {
      const { taskId, subtasks } = action.payload;

      const task = state.entities[taskId];

      const updatedTask = {
        ...task,
        subtasks: subtasks,
      };

      return {
        ...state,
        entities: {
          ...state.entities,
          [taskId]: updatedTask,
        },
      };
    }
    case ACTION_TYPE.REMOVE_TASKS: {
      return {
        ...state,
        entities: {},
        order: {},
      };
    }
    case ACTION_TYPE.MOVE_TASK: {
      const { source, destination, draggableId } = action.payload;

      // If the source and destination are the same, do nothing
      if (
        !source.droppableId ||
        !destination.droppableId ||
        (source.droppableId === destination.droppableId &&
          source.index === destination.index)
      ) {
        return state;
      }

      // Get the track ID from the source and destination
      const sourceTrackId = source.droppableId;
      const destinationTrackId = destination.droppableId;

      // Get the task ID from the source
      const sourceTaskId = draggableId;

      // Get the task from the entities
      const task = state.entities[draggableId];

      // Create a new task object with the updated track ID
      const updatedTask = {
        ...task,
        trackId: destinationTrackId,
      };

      // Remove the task from the source track's order
      const sourceTrackOrder = state.order[sourceTrackId];
      sourceTrackOrder.splice(source.index, 1);

      let destinationTrackOrder = state.order[destinationTrackId];

      if (!destinationTrackOrder) {
        state.order[destinationTrackId] = [];
        destinationTrackOrder = state.order[destinationTrackId];
      }
      destinationTrackOrder.splice(destination.index, 0, sourceTaskId);

      return {
        ...state,
        entities: {
          ...state.entities,
          [sourceTaskId]: updatedTask,
        },
        order: {
          ...state.order,
          [sourceTrackId]: sourceTrackOrder,
          [destinationTrackId]: destinationTrackOrder,
        },
      };
    }

    default:
      return state;
  }
}
