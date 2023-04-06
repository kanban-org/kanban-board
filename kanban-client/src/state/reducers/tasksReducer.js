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

      // Create an empty order object to start with
      const order = {};

      // Loop through all the loaded tasks
      Object.values(tasks).forEach((task) => {
        // Check if the task's track ID exists in the order object
        const trackId = task.trackId;
        const trackOrder = order[trackId] || [];

        // Add the task ID to the track's order
        order[trackId] = [...trackOrder, task.id];
      });

      return {
        ...state,
        entities: {
          ...state.entities,
          ...tasks,
        },
        order,
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
    case ACTION_TYPE.REMOVE_TASKS: {
      return {
        ...state,
        entities: {},
        order: {},
      };
    }

    default:
      return state;
  }
}
