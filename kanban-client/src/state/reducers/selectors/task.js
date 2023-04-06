import { createSelector } from "reselect";

const selectTaskEntities = (state) => state.tasks.entities;
const selectTaskOrder = (state) => state.tasks.order;

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

export const selectTaskIdsOfTrack = (state, trackId) => {
  return selectTaskOrder(state)[trackId] || [];
};

export const selectTasksOfTrack = (state, trackId) => {
  const tasks = selectTasks(state);
  return tasks.filter((task) => task.trackId === trackId);
};
