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

*/

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
