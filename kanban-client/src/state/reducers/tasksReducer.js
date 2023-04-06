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
      return {
        ...state,
        entities: {
          ...state.entities,
          ...tasks,
        },
      };
    }
    case ACTION_TYPE.ADD_NEW_TASK: {
      const task = action.payload;

      return {
        ...state,
        entities: {
          ...state.entities,
          [task.id]: task,
        },
      };
    }
    case ACTION_TYPE.REMOVE_TASKS: {
      return {
        ...state,
        entities: {},
      };
    }

    default:
      return state;
  }
}
