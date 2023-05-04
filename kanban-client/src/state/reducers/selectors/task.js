import { createSelector } from "reselect";

const selectTaskEntities = (state) => state.tasks.entities;
export const selectTaskOrder = (state) => state.tasks.order;

export const selectTasks = createSelector(
  selectTaskEntities,
  // output selector
  (entities) => Object.values(entities)
);

export const selectTaskById = (state, taskId) => {
  return selectTaskEntities(state)[taskId];
};

export const selectTaskIds = createSelector(selectTaskEntities, (entities) =>
  Object.keys(entities)
);

export const selectTaskIdsOfTrack = createSelector(
  selectTaskOrder,
  (_, trackId) => trackId,
  (order, trackId) => order[trackId] || []
);

export const selectTasksOfTrack = createSelector(
  // input selectors
  selectTaskEntities,
  selectTaskIdsOfTrack,
  // output selector
  (entities, taskIds) => taskIds.map((taskId) => entities[taskId])
);

export const selectTasksCountOfTrack = createSelector(
  selectTaskIdsOfTrack,
  (taskIds) => taskIds.length
);

// Selectors for subtasks

export const selectCountOfCompletedSubtasks = createSelector(
  (_, taskId) => taskId,
  selectTaskEntities,
  (taskId, entities) => {
    const subtasks = entities[taskId]?.Subtasks;
    if (subtasks === undefined) return 0;
    return subtasks.reduce((acc, subtask) => {
      if (subtask.status === true) return acc + 1;
      else return acc;
    }, 0);
  }
);
